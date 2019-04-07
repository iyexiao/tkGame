import SkillAiBase from "../AiBase"

/**
 * @class Skill_CR_Big
 * @author YeXiao
 * @deprecated 曹仁大招技能
 * @since 2019-4-7 21:29:19
 */
export default class Skill_CR_Big extends SkillAiBase{
    private _skillArr:Array<string> = null;
    constructor(skillArr?:Array<string>){
        super("Skill_CR_Big");
        if (skillArr) {
            this._skillArr = skillArr;
        }
    }
}