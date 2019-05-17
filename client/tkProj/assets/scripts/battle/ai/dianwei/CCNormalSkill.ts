import ModelBase from "../../model/ModelBase";
import SkillAiBase from "../AiBase";

/**
 * @class CCNormalSkill
 * @author YeXiao
 * @deprecated 典韦普攻技能
 * @since 2019-5-17 19:04:07
 */
export default class CCNormalSkill extends SkillAiBase {
    private skillArr: string[] = null;
    constructor(model: ModelBase, skillArr?: string[]) {
        super("CCNormalSkill", model);
        if (skillArr) {
            this.skillArr = skillArr;
        }
    }
    public onAttackStart(model: ModelBase): void {
        super.onAttackStart(model);
    }
    public onSkillStart(param: any): void {
        if (super.checkIsSelfModel(param.model)) {
            return;
        }
    }
    public onSkillEnd(param: any): void {
        if (super.checkIsSelfModel(param.model)) {
            return;
        }
    }
}
