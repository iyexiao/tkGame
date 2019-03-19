import ModelBase from "../model/ModelBase"
import EventManager from "../../../framework/event/EventManager";
import { EBattleTrigger } from "../utils/UtilsEnum";
/**
 * @class SkillAiBase
 * @author YeXiao
 * @deprecated 英雄战斗技能AI接口,添加新技能ai脚本的时候，需要在AiConst.ts里面声明
 * @since 2019-3-15 15:58:13
 */
export default abstract class SkillAiBase{
    private _skillName:string = null;
    private _playerModel:ModelBase = null;
    constructor(nameStr:string){
        this._skillName = nameStr;
        EventManager.getInstance().addEventListener(EBattleTrigger.onSkillStart,this.onSkillStart,this);
        EventManager.getInstance().addEventListener(EBattleTrigger.onSkillEnd,this.onSkillEnd,this);
    }
    /**
     * - 设置技能的释放者
     * @param model 设置技能释放者
     */
    setPlayerModel(model:ModelBase):void{
        this._playerModel = model;
    }
    get PlayerModel(){
        return this._playerModel;
    }
    get SkillName():string{
        return this._skillName;
    }
    checkIsSelfModel(otherModel:ModelBase):boolean{
        if (!otherModel || !this._playerModel) {
            return false
        }
        if (otherModel == this._playerModel) {
            return true;
        }
        return false;
    }
    /**
     * @description 当一个英雄开始攻击时
     * @param model 攻击的英雄
     */
    onAttackStart(model:ModelBase):void{};
    /**
     * @description 当一个英雄攻击结束时
     * @param model 攻击的英雄
     */
    onAttackEnd(model:ModelBase):void{};
    /**
     * - 当一个英雄释放一个技能
     * @param {model}  释放技能的英雄
     */
    onSkillStart(param:any):void{};
    /**
     * - 当一个英雄技能释放完毕
     * @param {model} 释放技能的英雄
     */
    onSkillEnd(param:any):void{};
    /**
     * @description 当一个英雄受到攻击时
     * @param model 受击的英雄
     */
    onDefend(model:ModelBase):void{};
    /**
     * @description 当有英雄属性变化时
     * @param model 属性变化的英雄
     */
    onPropChange(model:ModelBase):void{};
    /**
     * @description 当一个英雄死亡时
     * @param model 死亡的英雄
     */
    onDead(model:ModelBase):void{};
    /**
     * @description 当一个英雄被击杀时
     * @param model 被击杀的英雄
     */
    onKill(model:ModelBase):void{};
}