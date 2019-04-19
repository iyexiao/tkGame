import EventManager from "../../../framework/event/EventManager";
import ModelBase from "../model/ModelBase";
import LogsManager from "../utils/LogsManager";
import { EBattleTrigger } from "../utils/UtilsEnum";
/**
 * @class SkillAiBase
 * @author YeXiao
 * @deprecated 英雄战斗技能AI接口,添加新技能ai脚本的时候，需要在AiConst.ts里面声明
 * @since 2019-3-15 15:58:13
 */
export default abstract class SkillAiBase {
    private skillName: string = null;
    private readonly playerModel: ModelBase = null;
    constructor(nameStr: string, model: ModelBase) {
        this.skillName = nameStr;
        EventManager.getInstance().addEventListener(EBattleTrigger.onSkillStart, this.onSkillStart, this);
        EventManager.getInstance().addEventListener(EBattleTrigger.onSkillEnd, this.onSkillEnd, this);
        EventManager.getInstance().addEventListener(EBattleTrigger.onSkillHurt, this.onSkillHurt, this);
        this.playerModel = model;
        // LogsManager.getInstance().echo("初始化脚本：" + this.skillName);
    }
    get PlayerModel() {
        return this.playerModel;
    }
    get SkillName(): string {
        return this.skillName;
    }
    public checkIsSelfModel(otherModel: ModelBase): boolean {
        if (!otherModel || !this.playerModel) {
            return false;
        }
        if (otherModel === this.playerModel) {
            return true;
        }
        return false;
    }
    /**
     * @description 当一个英雄开始攻击时
     * @param model 攻击的英雄
     */
    public onAttackStart(model: ModelBase): void {}
    /**
     * @description 当一个英雄攻击结束时
     * @param model 攻击的英雄
     */
    public onAttackEnd(model: ModelBase): void {}
    /**
     * - 当一个英雄释放一个技能
     * @param {model}  释放技能的英雄
     */
    public onSkillStart(param: any): void {}
    /**
     * - 当一个英雄技能释放完毕
     * @param {model} 释放技能的英雄
     */
    public onSkillEnd(param: any): void {}
    /**
     * - 当英雄受到技能伤害时(一个技能只会触发一次)
     * @param param 
     */
    public onSkillHurt(param: any): void {}
    /**
     * @description 当一个英雄受到攻击时
     * @param model 受击的英雄
     */
    public onDefend(model: ModelBase): void { }
    /**
     * @description 当有英雄属性变化时
     * @param model 属性变化的英雄
     */
    public onPropChange(model: ModelBase): void { }
    /**
     * @description 当一个英雄死亡时
     * @param model 死亡的英雄
     */
    public onDead(model: ModelBase): void { }
    /**
     * @description 当一个英雄被击杀时
     * @param model 被击杀的英雄
     */
    public onKill(model: ModelBase): void { }
}
