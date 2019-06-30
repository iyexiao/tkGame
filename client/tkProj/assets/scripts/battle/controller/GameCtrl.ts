import ConstValue from "../ConstValue";
import {HeroInfo} from "../info/HeroInfo";
import ModelBase from "../model/ModelBase";
import LogsManager from "../utils/LogsManager";
import {ECamp, EGameType, EGameStep, EGameResult} from "../utils/UtilsEnum";
import BaseCtrl from "./BaseCtrl";
import BattleCtrl from "./BattleCtrl";
/**
 * @class GameCtrl
 * @extends BaseCtrl
 * @author YeXiao
 * @deprecated 游戏总控制器
 * @since 2019-3-12 17:15:00
 *
 */
export default class GameCtrl extends BaseCtrl {
    private aliveModelArr: ModelBase[] = null; // 战场上的英雄数组
    private currFrame: number = null;  // 当前运行的帧数
    private deadModelArr: ModelBase[] = null;  // 死亡的英雄数组
    private gameStep: EGameStep = null;

    constructor(ctrl: BattleCtrl) {
        super(ctrl);
        this.aliveModelArr = [];
        this.deadModelArr = [];
        this.currFrame = 0;
        this.gameStep = EGameStep.wait;
        this.initModelList();
    }
    get ModelArr() {
        return this.aliveModelArr;
    }
    get CurrentFrame() {
        return this.currFrame;
    }
    get GameStep(): EGameStep {
        return this.gameStep;
    }
    /**
     * @description 初始化战场上模型
     */
    public initModelList() {
        const tmpArr = [ECamp.camp1, ECamp.camp2];
        for (const iterator of tmpArr) {
            const arr = this.BattleCtrl.LevelCtrl.getHeroInfoByCamp(iterator);
            for (const heroInfo of arr) {
                const model = this.createOneModelByHeroInfo(heroInfo);
                this.aliveModelArr.push(model);
            }
        }
    }
    /**
     * @description 根据英雄数据创建一个英雄单位模型
     * @param hero
     * @returns ModelBase
     */
    public createOneModelByHeroInfo(hero: HeroInfo): ModelBase {
        const model = new ModelBase(this, hero);
        return model;
    }
    /**
     * @description 开始战斗
     */
    public startBattle() {
        LogsManager.getInstance().log("开始一场战斗----->>GameCtrl.startBattle");
        this.initModelsAura();
        this.BattleCtrl.HandleCtrl.sortModelHandle();
        this.updateGameStep(EGameStep.ready);
        // 只有跑逻辑的时候才走这个循环
        if (this.BattleCtrl.GameType === EGameType.dummy) {
            this.startGameLoopByDummy();
        }
    }
    /**
     * @description 初始化光环
     */
    public initModelsAura() {
        LogsManager.getInstance().log("======>>>>>>初始化光环技能");
        for (const iterator of this.aliveModelArr) {
            iterator.initAura();
        }
    }
    /**
     * @description 开始游戏轮询
     */
    public startGameLoopByDummy() {
        for (let index = 0; index < ConstValue.GAME_TOTAL_FRAME; index++) {
            if (this.gameStep ===  EGameStep.result) {
                break;
            }
            this.doBattleLockStep();
        }
    }
    /**
     * @description 做游戏的帧循环
     */
    public doBattleLockStep() {
        this.currFrame = this.currFrame + 1;
        const tmpArr = this.BattleCtrl.HandleCtrl.getCurrentAttackModel();
        if (tmpArr.length > 0 ) {
            this.BattleCtrl.LogicCtrl.doAttackByHeroList(tmpArr);
        }
        this.updateModelFrame();
    }
    /**
     * @description 更新游戏状态
     * @param gStep 
     */
    public updateGameStep(gStep:EGameStep) {
        this.gameStep = gStep;
    }
    /**
     * @description 更新战场上所有英雄的攻击时间
     */
    public updateModelFrame() {
        for (const model of this.aliveModelArr) {
            model.updateHeroFrame();
        }
    }
    /**
     * @description 根据阵营及位置获取英雄模型(不论死亡与否)
     * @param camp 
     * @param posIdx 
     */
    public getHeroModelByCampPos(camp: ECamp,posIdx: number): ModelBase {
        for (let index = 0; index < this.aliveModelArr.length; index++) {
            const model = this.aliveModelArr[index];
            if (model.getHeroCamp() === camp && model.getHeroPosIndex() === posIdx) {
                return model;
            }
        }
        for (let index = 0; index < this.deadModelArr.length; index++) {
            const model = this.deadModelArr[index];
            if (model.getHeroCamp() === camp && model.getHeroPosIndex() === posIdx) {
                return model;
            }
        }
        return null;
    }
    /**
     * - 根据阵营获取归属当前阵营的英雄
     * @returns Array<ModelBase>
     * @param camp 阵营
     */
    public getModelListByCamp(camp: ECamp): ModelBase[] {
        const tmpList = [];
        this.aliveModelArr.forEach((model) => {
            if (model.checkIsAlive() && model.getHeroCamp() === camp) {
                tmpList.push(model);
            }
        });
        return tmpList;
    }
    /**
     * - 根据阵营获取归属当前阵营的英雄
     * @returns Array<ModelBase>
     * @param camp 阵营
     * @param protList 阵营数组选敌顺序
     */
    public getProtModelListByCamp(camp: ECamp, protList: number[][]): ModelBase[][] {
        const tmpList = [[], [], []];
        this.aliveModelArr.forEach((model) => {
            const posIdx = model.getHeroPosIndex();
            if (model.checkIsAlive() && model.getHeroCamp() === camp) {
                for (let index = 0; index < protList.length; index++) {
                    const posIdxList = protList[index];
                    if (posIdxList.indexOf(posIdx) >= 0) {
                        tmpList[index].push(model);
                        break;
                    }
                }
            }
        });
        return tmpList;
    }
    /**
     * @description 根据阵营检查是否有存活角色
     * @param camp 
     */
    public checkHaveAliveModelByCamp(camp: ECamp) {
        for (let index = 0; index < this.aliveModelArr.length; index++) {
            const model = this.aliveModelArr[index];
            if (model.getHeroCamp() === camp && model.checkIsAlive()) {
                return true;
            }
        }
        return false;
    }
    /**
     * - 从可行动的数组里移除一个英雄
     * @param model 将要移除的英雄
     */
    public onOneModelDead(model: ModelBase) {
        // 从出手顺序中移除它，并把它放入死亡列表(有可能复活)，
        this.BattleCtrl.HandleCtrl.delModelHandle(model);
        this.aliveModelArr.filter((item) => item !== model);
        this.deadModelArr.push(model);
        this.checkEndBattle();
    }
    /**
     * @description 检查游戏是否结束
     */
    public checkEndBattle() {
        const self = this;
        let doEndBattleLogic = function(gResult: EGameResult) {
            if (self.gameStep == EGameStep.result) {
                return;
            }
            self.gameStep = EGameStep.result;
            self.BattleCtrl.updateBattleResult(gResult);
            // 清空出手顺序
            self.BattleCtrl.HandleCtrl.clearModelHandle();
            // 存储战报
            self.BattleCtrl.saveBattleReport(self.getBattleHeroReport());
        }
        // 每死亡一个人，都需要检查战斗是否结束 TODO:需要校验我方阵营归属
        if(!this.checkHaveAliveModelByCamp(ECamp.camp1)) {
            doEndBattleLogic(EGameResult.lose);
        }
        if(!this.checkHaveAliveModelByCamp(ECamp.camp2)) {
            doEndBattleLogic(EGameResult.win);
        }
    }
    /**
     * @description 获取战斗结果的英雄数据
     */
    getBattleHeroReport() {
        const rtList = [[],[]];
        for (let index = 0; index < this.aliveModelArr.length; index++) {
            const model = this.aliveModelArr[index];
            // hid、posIdx、hp
            const rtObj = {
                hid:model.HeroInfo.HeroDB.id,
                posIdx:model.getHeroPosIndex(),
                hp: model.HeroInfo.HeroAttr.hp
            }
            rtList[model.getHeroCamp()].push(rtObj);
        }
        return rtList;
    }
}
