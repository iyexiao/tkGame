import ModelBase from "../model/ModelBase"
import SkillAiBase from "./AiBase"

/**
 * @class Skill_XHY_Normal
 * @author YeXiao
 * @deprecated 夏侯渊攻技能
 * @since 2019-4-1 17:17:49
 */
export default class Skill_XHY_Normal extends SkillAiBase{
    private _skillArr:Array<string> = null;
    constructor(skillArr?:Array<string>){
        super("Skill_XHY_Normal");
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
    }
}