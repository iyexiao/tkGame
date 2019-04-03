import SkillAiBase from "../AiBase"

/**
 * @class Skill_XZ_Big
 * @author YeXiao
 * @deprecated 许诸大招技能
 * @since 2019-4-2 18:02:56
 */
export default class Skill_XZ_Big extends SkillAiBase{
    private _skillArr:Array<string> = null;
    constructor(skillArr?:Array<string>){
        super("Skill_XZ_Big");
        if (skillArr) {
            this._skillArr = skillArr;
        }
    }
}