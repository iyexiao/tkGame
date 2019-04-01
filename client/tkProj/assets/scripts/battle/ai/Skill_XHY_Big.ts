import SkillAiBase from "./AiBase"

/**
 * @class Skill_XHY_Big
 * @author YeXiao
 * @deprecated 夏侯渊大招
 * @since 2019-3-25 11:07:00
 */
export default class Skill_XHY_Big extends SkillAiBase{
    private _skillArr:Array<string> = null;
    constructor(skillArr?:Array<string>){
        super("Skill_XHY_Big");
        if (skillArr) {
            this._skillArr = skillArr;
        }
    }
}