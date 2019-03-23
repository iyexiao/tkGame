import ModelBase from "../model/ModelBase"
import SkillAiBase from "./SkillAiBase"

/**
 * @class SkilllAi_CC_Normal
 * @author YeXiao
 * @deprecated 曹操普工技能
 * @since 2019-3-23 22:04:26
 */
export default class SkilllAi_CC_Normal extends SkillAiBase{
    private _skillArr:Array<string> = null;
    constructor(skillArr?:Array<string>){
        super("SkilllAi_CC_Normal");
        if (skillArr) {
            this._skillArr = skillArr;
        }
    }
    onAttackStart(model:ModelBase):void{
        super.onAttackStart(model);
    }
    onHeroDead(model:ModelBase):void{

    }
    onSkillStart(param:any):void{
        if(super.checkIsSelfModel(param.model)){
            return;
        }
    }
    onSkillEnd(param:any):void{
        if(super.checkIsSelfModel(param.model)){
            return;
        }
        console.log("在第：" + this.PlayerModel.getGameCurrFrame() + "帧,阵营：" + this.PlayerModel.getHeroCamp() + " 英雄：" + this.PlayerModel.getHeroName() + " 释放技能结束");
    }
}