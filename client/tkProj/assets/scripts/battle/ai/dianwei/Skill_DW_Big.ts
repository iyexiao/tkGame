import SkillAiBase from "../AiBase"

/**
 * @class Skill_DW_Big
 * @author YeXiao
 * @deprecated 典韦大招
 * @since 2019-3-30 21:12:48
 */
export default class Skill_DW_Big extends SkillAiBase{
    private _skillArr:Array<string> = null;
    constructor(skillArr?:Array<string>){
        super("Skill_DW_Big");
        if (skillArr) {
            this._skillArr = skillArr;
        }
    }
}