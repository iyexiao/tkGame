import SkillAiBase from "../AiBase";

/**
 * @class CCPassiveSkill
 * @author YeXiao
 * @deprecated 曹操被动
 * @since 2019-3-25 11:07:00
 */
export default class CCPassiveSkill extends SkillAiBase {
    private skillArr: string[] = null;
    constructor(skillArr?: string[]) {
        super("CCPassiveSkill");
        if (skillArr) {
            this.skillArr = skillArr;
        }
    }
}
