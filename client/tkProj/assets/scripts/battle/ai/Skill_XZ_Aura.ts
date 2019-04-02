import SkillAiBase from "./AiBase"

/**
 * @class Skill_XZ_Aura
 * @author YeXiao
 * @deprecated 许诸光环技能
 * @since 2019-4-2 18:02:39
 */
export default class Skill_XZ_Aura extends SkillAiBase{
    private _skillArr:Array<string> = null;
    constructor(skillArr?:Array<string>){
        super("Skill_XZ_Aura");
        if (skillArr) {
            this._skillArr = skillArr;
        }
    }
}