import ModelBase from "../../model/ModelBase";
import SkillAiBase from "../AiBase";

/**
 * @class CCAuraSkill
 * @author YeXiao
 * @deprecated 典韦光环
 * @since 2019-5-17 19:03:55
 */
export default class CCAuraSkill extends SkillAiBase {
    private skillArr: string[] = null;
    constructor(model: ModelBase, skillArr?: string[]) {
        super("CCAuraSkill", model);
        if (skillArr) {
            this.skillArr = skillArr;
        }
    }
}
