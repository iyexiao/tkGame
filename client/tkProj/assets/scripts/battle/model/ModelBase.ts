import EventManager from "../../../framework/event/EventManager";
import GameCtrl from "../controller/GameCtrl";
import { BuffInfo } from "../info/BuffInfo";
import {EHeroAttr, HeroInfo} from "../info/HeroInfo";
import LogsManager from "../utils/LogsManager";
import { EBattleTrigger, EBuffType, ECamp, EPropType, ESkillType } from "../utils/UtilsEnum";
import BuffComponent from "./componenet/BuffComponent";
import SkillComponent from "./componenet/SkillComponent";

/**
 * @class ModelBase
 * @author YeXiao
 * @deprecated model基类,采用ces设计模式，buff、skill通过component形式组装
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
    get SkillCom() {
        return this.skillCom;
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
        const skillId = this.HeroInfo.SkillIds[ESkillType.aura];
        if (skillId) {
            const logStr = "=====>>>>阵营: " + this.getHeroCamp() + " 的光环技能：" + skillId + " 生效！";
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
        // 更新buff 组件
        if (this.buffCom) {
            this.buffCom.update();
        }
        // 更新skill 组件
        if (this.skillCom) {
            this.skillCom.update();
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
     * - 检查角色是否能够攻击
     */
    public checkCanAttack(): boolean {
        // 角色已经死亡
        if (!this.checkIsAlive()) {
            return false;
        }
        // 没有技能组件
        if (!this.skillCom) {
            return false;
        }
        // 有不可攻击的buff
        if (this.buffCom && this.buffCom.checkHaveUnAttackBuff()) {
            return false;
        }
        return true;
    }
    /**
     * - 检查并准备释放某个技能
     * @returns 是否有技能课释放
     */
    public checkToPlaySkill(): boolean {
        if (!this.checkCanAttack()) {
            LogsManager.getInstance().log("角色不能攻击");
            return false;
        }
        if (this.skillCom.CurrSkill) {
            LogsManager.getInstance().log("有技能在释放中");
            return false;
        }
        // 准备释放一个技能
        if (!this.skillCom.checkAndPrepareGiveOutOneSkill()) {
            LogsManager.getInstance().log("没有可释放的技能");
            return false;
        }
        // 先将英雄从队列里面删除掉，然后重置攻击间隔、然后再加入队列里面
        this.ctrl.BattleCtrl.HandleCtrl.delModelHandle(this);
        this.heroInfo.setCurrAtkFrame(this.heroInfo.getAttackCDFrame());
        this.ctrl.BattleCtrl.HandleCtrl.addModelHandle(this);

        // 若技能没有前摇动作，则直接释放
        if (!this.skillCom.checkCurrentHaveBeforeFrame()) {
            this.realGiveOneSkill();
        }
        return true;
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
     * - 添加或者移除一个buff
     * @param buffInfo
     * @param isAdd
     */
    public changeHeroInfoByBuff(buffInfo: BuffInfo, isAdd?: boolean) {
        EventManager.getInstance().dispatchEvent(EBattleTrigger.onBuffExchange, {model: this});
        const bType = buffInfo.getBuffType();
        let value = buffInfo.getBuffValue();
        if (!buffInfo.checkBuffIsIncrease()) {
            value = -value;
        }
        if (!isAdd) {
            value = -value;// 不是加buff的则移除
        }
        if (this.checkIsAlive()) {
            // buff产生值最终都转换为叠加方式来计算
            this.HeroInfo.changePropValue(bType, value, EPropType.addSub, this, true);
        }
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
