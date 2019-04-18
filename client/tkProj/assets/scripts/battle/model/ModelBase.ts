import EventManager from "../../../framework/event/EventManager";
import GameCtrl from "../controller/GameCtrl";
import {EHeroAttr, HeroInfo} from "../info/HeroInfo";
import { SkillInfo } from "../info/SkillInfo";
import LogsManager from "../utils/LogsManager";
import { EBattleTrigger, EBuffType, ECamp, EPropType, ESkillType } from "../utils/UtilsEnum";
import BuffComponent from "./componenet/BuffComponent";
import SkillComponent from "./componenet/SkillComponent";

/**
 * @class ModelBase
 * @author YeXiao
 * @deprecated model基类
 * @since 2019-3-12 17:15:30
 *
 */
export default class ModelBase {
    private ctrl: GameCtrl = null;
    private heroInfo: HeroInfo = null;
    private isAlive: boolean = null;            // 是否活着
    private buffCom: BuffComponent = null;
    private skillCom: SkillComponent = null;
    constructor(controler: GameCtrl, heroInfo: HeroInfo) {
        this.isAlive = true;
        this.ctrl = controler;
        this.heroInfo = heroInfo;
        this.buffCom = new BuffComponent(this);
        this.skillCom = new SkillComponent(this);
    }
    get BuffCom() {
        return this.buffCom;
    }
    get HeroInfo() {
        return this.heroInfo;
    }
    public getGameCurrFrame() {
        return this.ctrl.CurrentFrame;
    }
    get Ctrl() {
        return this.ctrl;
    }
    /**
     * 初始化英雄的光环技能
     */
    public initAura() {
        const skillInfo = this.HeroInfo.SkillList[ESkillType.aura];
        if (skillInfo) {
            const logStr = "=====>>>>阵营: " + this.getHeroCamp() + " 的光环技能：" + skillInfo.SkillDB.id + " 生效！";
            LogsManager.getInstance().log(logStr);
        }
    }
    /**
     * @description 更新英雄出手帧数、前摇帧数等
     */
    public updateHeroFrame() {
        const tmpFrame = this.heroInfo.CurrAtkFrame <= 0 ? 0 : this.heroInfo.CurrAtkFrame - 1;
        this.heroInfo.setCurrAtkFrame(tmpFrame);
        if (this.skillCom.CurrSkill) {
            // 还存活的才能做技能逻辑处理
            if (this.isAlive) {
                const isEnd =  this.skillCom.CurrSkill.updateSkillAttr();
                if (isEnd) {
                    this.giveOutOneSkillEnd();
                }
            } else {
                this.skillCom.resetCurrentSkill();
            }
        }
    }
    /**
     * - 获取英雄当前攻速
     */
    public getHeroAtkFrame(): number {
        return this.heroInfo.CurrAtkFrame;
    }
    /**
     * - 获取英雄名字
     */
    public getHeroName(): string {
        return this.HeroInfo.HeroDB.name;
    }
    /**
     * @description 获取英雄当前对应阵营
     * @returns ECamp
     */
    public getHeroCamp(): ECamp {
        return this.HeroInfo.HeroAttr.camp;
    }
    /**
     * - 获取英雄的位置信息
     * @returns posIdx 位置信息
     */
    public getHeroPosIndex(): number {
        return this.HeroInfo.HeroAttr.posIdx;
    }
    /**
     * 获取可以释放的技能(返回空说明没有可释放的技能)
     * @returns SkillInfo 将要播放的技能
     */
    public getPlaySkillInfo(): SkillInfo {
        // test
        return this.HeroInfo.SkillList[0];
    }
    /**
     * 检查角色是否存活
     */
    public checkIsAlive(): boolean {
        return this.isAlive;
    }
    /**
     * - 技能释放结束
     */
    public giveOutOneSkillEnd() {
        EventManager.getInstance().dispatchEvent(EBattleTrigger.onSkillEnd, { model: this});
        LogsManager.getInstance().skilllog( EBattleTrigger.onSkillEnd, this );
        this.skillCom.resetCurrentSkill();
    }
    /**
     * - 真正释放一个技能
     */
    public realGiveOneSkill() {
        // 真正释放一个技能
        EventManager.getInstance().dispatchEvent(EBattleTrigger.onSkillStart, {model: this});
        LogsManager.getInstance().skilllog(EBattleTrigger.onSkillStart,  this );
        // 如果技能没有释放时间、则直接技能释放结束
        if (this.skillCom.CurrSkill.SkillDB.totalFrame === 0) {
            this.giveOutOneSkillEnd();
        }
    }
    /**
     * - 准备释放某一技能
     */
    public prepareGiveOutOneSkill(skillInfo: SkillInfo) {
        // 先将英雄从队列里面删除掉，然后重置攻击间隔、然后再加入队列里面
        this.ctrl.BattleCtrl.HandleCtrl.delModelHandle(this);
        this.heroInfo.setCurrAtkFrame(this.heroInfo.getAttackCDFrame());
        this.ctrl.BattleCtrl.HandleCtrl.addModelHandle(this);
        if (!skillInfo) {
            LogsManager.getInstance().log("没有可释放的技能");
            return;
        }
        if (this.skillCom.CurrSkill) {
            LogsManager.getInstance().log("有技能在释放中");
            return;
        }
        // 技能做选敌逻辑
        const defList = skillInfo.getChooseModelList(this);
        if (defList.length <= 0) {
            LogsManager.getInstance().log("未存在选敌逻辑");
            return;
        }
        this.skillCom.setSkillData(defList, skillInfo);
        // 若技能没有前摇动作，则直接释放
        if (skillInfo.SkillDB.beforeFrame === 0) {
            this.realGiveOneSkill();
        }
    }
    /**
     * - 释放某个攻击包
     * @param atk 攻击包信息
     */
    public giveOutOneSkillAtk() {
        const atkInfo = this.skillCom.CurrSkill.CurrrAtkInfo;
        if (atkInfo.checkIsFirst()) {
            atkInfo.updateIsFirst(); // 第一次命中需要算 buff
            EventManager.getInstance().dispatchEvent(EBattleTrigger.onSkillHurt, {model: this});
        }
        // 计算伤害
        for (const model of this.skillCom.LastChooseModelList) {
            let dmg = atkInfo.getDamage() * 5 - (model.heroInfo.HeroAttr.phyDef * 3 + model.heroInfo.HeroAttr.magicDef * 2);
            dmg = dmg <= 0 ? 0 : dmg;
            if (model.getHeroCamp() === this.getHeroCamp()) {
                dmg = -dmg; // 这个是加血
            }
            model.HeroInfo.changePropValue(EHeroAttr.hp, -dmg, atkInfo.getPropType(), model);
        }
        LogsManager.getInstance().skilllog(EBattleTrigger.onGiveOutAtk,  this );
    }
    /**
     * - 当英雄死亡时触发
     */
    public onHeroDead() {
        // 角色死亡
        if (this.isAlive) {
            this.isAlive = false;
            this.ctrl.BattleCtrl.LogicCtrl.onOneModelDead(this);
            LogsManager.getInstance().skilllog(EBattleTrigger.onDead,  this );
        }
    }
}
