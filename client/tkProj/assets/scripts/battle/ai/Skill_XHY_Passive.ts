import SkillAiBase from "./AiBase"

/**
 * @class Skill_XHY_Passive
 * @author YeXiao
 * @deprecated 夏侯渊被动技能
 * @since 2019-4-1 17:19:13
 */
export default class Skill_XHY_Passive extends SkillAiBase{
    private _skillArr:Array<string> = null;
    constructor(skillArr?:Array<string>){
        super("Skill_XHY_Passive");
        if (skillArr) {
            this._skillArr = skillArr;
        }
    }
}