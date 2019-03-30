import SkillAiBase from "./AiBase"

/**
 * @class Skill_DW_Passive
 * @author YeXiao
 * @deprecated 典韦被动
 * @since 2019-3-30 21:11:33
 */
export default class Skill_DW_Passive extends SkillAiBase{
    private _skillArr:Array<string> = null;
    constructor(skillArr?:Array<string>){
        super("Skill_DW_Passive");
        if (skillArr) {
            this._skillArr = skillArr;
        }
    }
}