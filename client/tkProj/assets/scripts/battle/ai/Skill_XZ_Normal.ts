import ModelBase from "../model/ModelBase"
import SkillAiBase from "./AiBase"

/**
 * @class Skill_XZ_Normal
 * @author YeXiao
 * @deprecated 许诸普攻技能
 * @since 2019-4-2 18:03:24
 */
export default class Skill_XZ_Normal extends SkillAiBase{
    private _skillArr:Array<string> = null;
    constructor(skillArr?:Array<string>){
        super("Skill_XZ_Normal");
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