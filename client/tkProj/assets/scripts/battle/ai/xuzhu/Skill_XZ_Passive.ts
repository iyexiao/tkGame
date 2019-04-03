import SkillAiBase from "../AiBase"

/**
 * @class Skill_XZ_Passive
 * @author YeXiao
 * @deprecated 许诸被动技能
 * @since 22019-4-2 18:03:45
 */
export default class Skill_XZ_Passive extends SkillAiBase{
    private _skillArr:Array<string> = null;
    constructor(skillArr?:Array<string>){
        super("Skill_XZ_Passive");
        if (skillArr) {
            this._skillArr = skillArr;
        }
    }
}