import ModelBase from "../../model/ModelBase";
import SkillAiBase from "../AiBase";

/**
 * @class CCBigSkill
 * @author YeXiao
 * @deprecated 典韦大招
 * @since 2019-5-17 19:04:01
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
