import ModelBase from "../../model/ModelBase";
import SkillAiBase from "../AiBase";

/**
 * @class CCSmallSkill
 * @author YeXiao
 * @deprecated 曹操小技能，对前排所有英雄攻击进行攻击（前排无人选中排），并对敌人施加减防buff
 * @since 2019-3-23 22:04:26
 */
export default class CCSmallSkill extends SkillAiBase {
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
        const model: ModelBase = param.model;
        if (super.checkIsSelfModel(model)) {
            return;
        }
        const list = this.PlayerModel.SkillCom.getChooseModelList();
        list.forEach(element => {
            if (element.checkIsAlive()) {
                element.BuffCom.executeOneBuff(this.skillArr[0]);
            }
        });
    }
}
