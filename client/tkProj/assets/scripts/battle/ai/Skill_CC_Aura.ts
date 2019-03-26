import SkillAiBase from "./AiBase"

/**
 * @class Skill_CC_Aura
 * @author YeXiao
 * @deprecated 曹操光环
 * @since 2019-3-25 11:07:00
 */
export default class Skill_CC_Aura extends SkillAiBase{
    private _skillArr:Array<string> = null;
    constructor(skillArr?:Array<string>){
        super("Skill_CC_Aura");
        if (skillArr) {
            this._skillArr = skillArr;
        }
    }
}