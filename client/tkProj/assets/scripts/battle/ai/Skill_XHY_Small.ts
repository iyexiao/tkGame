import ModelBase from "../model/ModelBase"
import SkillAiBase from "./AiBase"

/**
 * @class Skill_XHY_Small
 * @author YeXiao
 * @deprecated 夏侯渊小技能
 * @since 2019-4-1 17:19:54
 */
export default class Skill_XHY_Small extends SkillAiBase{
    private _skillArr:Array<string> = null;
    constructor(skillArr?:Array<string>){
        super("Skill_XHY_Small");
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