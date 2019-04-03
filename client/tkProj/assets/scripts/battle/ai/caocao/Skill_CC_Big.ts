import ModelBase from "../../model/ModelBase"
import SkillAiBase from "../AiBase"

/**
 * @class Skill_CC_Big
 * @author YeXiao
 * @deprecated 曹操大招
 * @since 2019-3-25 11:07:00
 */
export default class Skill_CC_Big extends SkillAiBase{
    private _skillArr:Array<string> = null;
    constructor(skillArr?:Array<string>){
        super("Skill_CC_Big");
        if (skillArr) {
            this._skillArr = skillArr;
        }
    }
}