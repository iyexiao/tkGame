import BattleCtrl from './BattleCtrl'
import BaseCtrl from './BaseCtrl'
import {ECamp} from '../utils/UtilsEnum'
import {HeroInfo} from '../info/HeroInfo'
import ModelHero from '../model/ModelHero'
import ConstValue from '../ConstValue';
import ModelBase from '../model/ModelBase';
import LogsManager from '../utils/LogsManager';
/**
 * @class GameCtrl
 * @extends BaseCtrl
 * @author YeXiao
 * @deprecated 游戏总控制器
 * @since 2019-3-12 17:15:00
 * 
 */
export default class GameCtrl extends BaseCtrl {
    private _modelArr:Array<ModelHero> = null;//战场上的英雄数组
    private _currFrame:number = null; //当前运行的帧数
    constructor(ctrl:BattleCtrl)
    {
        super(ctrl);
        this._modelArr = new Array<ModelHero>();
        this.initModelList();
    }
    get ModelArr(){
        return this._modelArr;
    }
    get CurrentFrame(){
        return this._currFrame;
    }
    /**
     * @description 初始化战场上模型
     */
    initModelList()
    {
        let tmpArr = [ECamp.camp1,ECamp.camp2];
        for(let key in tmpArr)
        {
            let arr = this.BattleCtrl.LevelCtrl.getHeroInfoByCamp(tmpArr[key]);
            for (let index = 0; index < arr.length; index++) {
                let model = this.createOneModelByHeroInfo(arr[index]);
                this._modelArr.push(model);
            }
        }
        
    }
    /**
     * @description 根据英雄数据创建一个英雄单位模型
     * @param hero 
     * @returns ModelHero
     */
    createOneModelByHeroInfo(hero:HeroInfo):ModelHero
    {
        let model = new ModelHero(this,hero);
        return model;
    }
    /**
     * @description 开始战斗
     */
    startBattle()
    {
        this.initModelsAura();
        this.startGameLoop();
    }
    /**
     * @description 初始化光环
     */
    initModelsAura()
    {
        LogsManager.getInstance().log("======>>>>>>初始化光环技能");
        for (let index = 0; index < this._modelArr.length; index++) {
            this._modelArr[index].initAura();
        }
    }
    /**
     * @description 开始游戏轮询
     */
    startGameLoop()
    {
        this.BattleCtrl.HandleCtrl.sortModelHandle();
        for (let index = 0; index < ConstValue.GAME_TOTAL_FRAM; index++) {
            this._currFrame = index;
            let tmpArr = this.BattleCtrl.HandleCtrl.getCurrentAttackModel();
            if (tmpArr.length > 0 ) {
                this.BattleCtrl.LogicCtrl.doAttackByHeroList(tmpArr);
            }
            this.updateModelFrame();
        }
    }
    /**
     * @description 更新战场上所有英雄的攻击时间
     */
    updateModelFrame(){
        for (let index = 0; index < this._modelArr.length; index++) {
            this._modelArr[index].updateHeroFrame();
        }
    }
    /**
     * - 根据阵营获取归属当前阵营的英雄
     * @returns Array<ModelBase>
     * @param camp 阵营
     */
    getModelListByCamp(camp:ECamp,protList:Array<Array<number>>):Array<Array<ModelBase>>{
        let tmpList = [[],[],[]];
        this._modelArr.forEach(element => {
            let posIdx = element.getHeroPosIndex();
            if (element.getHeroCamp() == camp) {
                for (let index = 0; index < protList.length; index++) {
                    const posIdxList = protList[index];
                    if(posIdxList.indexOf(posIdx) >= 0){
                        tmpList[index].push(element);
                        break;
                    }
                }
            }
        });
        return tmpList;
    }
}