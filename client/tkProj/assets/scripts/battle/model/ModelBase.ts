import EventManager from "../../../framework/event/EventManager";
import GameCtrl from "../controller/GameCtrl";
import {EHeroAttr, HeroInfo} from "../info/HeroInfo";
import { SkillInfo } from "../info/SkillInfo";
import LogsManager from "../utils/LogsManager";
import { EBattleTrigger, ECamp, EPropType } from "../utils/UtilsEnum";

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
    private currSkill: SkillInfo = null; // 英雄当前释放的技能
    private lastChooseModelList: ModelBase[] = null;   // 上次技能选中的敌人
    private isAlive: boolean = null;            // 是否活着
    constructor(controler: GameCtrl, heroInfo: HeroInfo) {
        this.isAlive = true;
        this.ctrl = controler;
        this.heroInfo = heroInfo;
        // 绑定技能对象数据
        this.heroInfo.SkillList.forEach((element) => {
            element.getSkillAi().setPlayerModel(this);
        });
    }
    get CurrSkill() {
        return this.currSkill;
    }
    get HeroInfo() {
        return this.heroInfo;
    }
    get LastChooseModelList() {
        return this.lastChooseModelList;
    }
    public getGameCurrFrame() {
        return this.ctrl.CurrentFrame;
    }
    get Ctrl() {
        return this.ctrl;
    }
    /**
     * @description 更新英雄出手帧数、前摇帧数等
     */
    public updateHeroFrame() {
        const tmpFrame = this.heroInfo.CurrAtkFrame <= 0 ? 0 : this.heroInfo.CurrAtkFrame - 1;
        this.heroInfo.setCurrAtkFrame(tmpFrame);
        if (this.currSkill) {
            const isEnd =  this.currSkill.updateSkillAttr();
            if (isEnd) {
                this.giveOutOneSkillEnd();
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
     * - 技能释放结束
     */
    public giveOutOneSkillEnd() {
        EventManager.getInstance().dispatchEvent(EBattleTrigger.onSkillEnd, { model: this});
        LogsManager.getInstance().skilllog( EBattleTrigger.onSkillEnd, this );
        this.resetCurrentSkill();
    }
    /**
     * - 重置技能，技能被打断了也需要重置
     */
    public resetCurrentSkill() {
        // 重置技能攻击包
        this.currSkill.resetAtkInfo();
        this.currSkill = null;
        this.lastChooseModelList = null;
    }
    /**
     * - 真正释放一个技能
     */
    public realGiveOneSkill() {
        // 真正释放一个技能
        EventManager.getInstance().dispatchEvent(EBattleTrigger.onSkillStart, {model: this});
        LogsManager.getInstance().skilllog(EBattleTrigger.onSkillStart,  this );
        // 如果技能没有释放时间、则直接技能释放结束
        if (this.currSkill.SkillDB.totalFrame === 0) {
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
        if (this.currSkill) {
            LogsManager.getInstance().log("有技能在释放中");
            return;
        }
        // 技能做选敌逻辑
        const defList = skillInfo.getChooseModelList(this);
        if (defList.length <= 0) {
            LogsManager.getInstance().log("未存在选敌逻辑");
            return;
        }
        // 设置选中的敌人
        this.lastChooseModelList = defList;
        // 设置释放的技能
        this.currSkill = skillInfo;
        // 设置技能释放者
        this.currSkill.updateSkillAttr(this);
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
        const atkInfo = this.currSkill.CurrrAtkInfo;
        if (atkInfo.checkIsFirst()) {
            atkInfo.updateIsFirst(); // 第一次命中需要算 buff
        }
        // 计算伤害
        for (const model of this.lastChooseModelList) {
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
        }
    }
}
