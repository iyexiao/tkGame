import ModelBase from "../../model/ModelBase";
import SkillAiBase from "../AiBase";

/**
 * @class CCBigSkill
 * @author YeXiao
 * @deprecated 曹操大招
 * @since 2019-3-25 11:07:00
 */
export default class CCBigSkill extends SkillAiBase {
    private skillArr: string[] = null;
    constructor(model: ModelBase, skillArr?: string[]) {
        super("CCBigSkill", model);
        if (skillArr) {
            this.skillArr = skillArr;
        }
    }
}
