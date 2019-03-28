import ModelBase from "../model/ModelBase"
import SkillAiBase from "./AiBase"

/**
 * @class Skill_DW_Normal
 * @author YeXiao
 * @deprecated 典韦普攻技能
 * @since 2019-3-28 16:58:37
 */
export default class Skill_DW_Normal extends SkillAiBase{
    private _skillArr:Array<string> = null;
    constructor(skillArr?:Array<string>){
        super("Skill_DW_Normal");
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