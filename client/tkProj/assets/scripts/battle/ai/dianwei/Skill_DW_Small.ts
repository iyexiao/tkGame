import ModelBase from "../../model/ModelBase"
import SkillAiBase from "../AiBase"

/**
 * @class Skill_DW_Small
 * @author YeXiao
 * @deprecated 典韦小技能
 * @since 2019-3-31 20:21:03
 */
export default class Skill_DW_Small extends SkillAiBase{
    private _skillArr:Array<string> = null;
    constructor(skillArr?:Array<string>){
        super("Skill_DW_Small");
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