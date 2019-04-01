import SkillAiBase from "./AiBase"

/**
 * @class Skill_XHY_Aura
 * @author YeXiao
 * @deprecated 夏侯渊光环技能
 * @since 2019-4-1 17:15:28
 */
export default class Skill_XHY_Aura extends SkillAiBase{
    private _skillArr:Array<string> = null;
    constructor(skillArr?:Array<string>){
        super("Skill_XHY_Aura");
        if (skillArr) {
            this._skillArr = skillArr;
        }
    }
}