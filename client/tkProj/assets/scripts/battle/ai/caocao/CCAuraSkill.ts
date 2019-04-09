import SkillAiBase from "../AiBase";

/**
 * @class CCAuraSkill
 * @author YeXiao
 * @deprecated 曹操光环
 * @since 2019-3-25 11:07:00
 */
export default class CCAuraSkill extends SkillAiBase {
    private skillArr: string[] = null;
    constructor(skillArr?: string[]) {
        super("CCAuraSkill");
        if (skillArr) {
            this.skillArr = skillArr;
        }
    }
}
