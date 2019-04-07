import SkillAiBase from "../AiBase"

/**
 * @class Skill_CR_Passive
 * @author YeXiao
 * @deprecated 曹仁被动技能
 * @since 2019-4-7 21:28:39
 */
export default class Skill_CR_Passive extends SkillAiBase{
    private _skillArr:Array<string> = null;
    constructor(skillArr?:Array<string>){
        super("Skill_CR_Passive");
        if (skillArr) {
            this._skillArr = skillArr;
        }
    }
}