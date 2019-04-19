import ModelBase from "../../model/ModelBase";
import SkillAiBase from "../AiBase";

/**
 * @class CCAuraSkill
 * @author YeXiao
 * @deprecated 曹操光环
 * @since 2019-3-25 11:07:00
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
