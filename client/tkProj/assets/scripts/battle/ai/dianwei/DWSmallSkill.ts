import ModelBase from "../../model/ModelBase";
import SkillAiBase from "../AiBase";

/**
 * @class DWSmallSkill
 * @author YeXiao
 * @deprecated 典韦小技能
 * @since 2019-3-23 22:04:26
 */
export default class DWSmallSkill extends SkillAiBase {
    private skillArr: string[] = null;
    constructor(model: ModelBase,skillName: string, skillArr?: string[]) {
        super(model,skillName);
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
