import SkillAiBase from "./AiBase"

/**
 * @class Skill_DW_Aura
 * @author YeXiao
 * @deprecated 典韦光环
 * @since 2019-3-31 20:22:00
 */
export default class Skill_DW_Aura extends SkillAiBase{
    private _skillArr:Array<string> = null;
    constructor(skillArr?:Array<string>){
        super("Skill_DW_Aura");
        if (skillArr) {
            this._skillArr = skillArr;
        }
    }
}