import ModelBase from "../../model/ModelBase"
import SkillAiBase from "../AiBase"

/**
 * @class Skill_XZ_Small
 * @author YeXiao
 * @deprecated 许诸小技能
 * @since 2019-4-2 18:04:08
 */
export default class Skill_XZ_Small extends SkillAiBase{
    private _skillArr:Array<string> = null;
    constructor(skillArr?:Array<string>){
        super("Skill_XZ_Small");
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