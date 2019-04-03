import SkillAiBase from "../AiBase"

/**
 * @class Skill_CC_Passive
 * @author YeXiao
 * @deprecated 曹操被动
 * @since 2019-3-25 11:07:00
 */
export default class Skill_CC_Passive extends SkillAiBase{
    private _skillArr:Array<string> = null;
    constructor(skillArr?:Array<string>){
        super("Skill_CC_Passive");
        if (skillArr) {
            this._skillArr = skillArr;
        }
    }
}