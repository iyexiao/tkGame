import ModelBase from "../../model/ModelBase";
import SkillAiBase from "../AiBase";

/**
 * @class CCBigSkill
 * @author YeXiao
 * @deprecated 曹操大招,对前排所有英雄攻击进行攻击（前排无人选中排），并回复自身血量（当前攻击力*15%）
 * @since 2019-3-25 11:07:00
 */
export default class CCBigSkill extends SkillAiBase {
    private skillArr: string[] = null;
    constructor(model: ModelBase,skillName: string, skillArr?: string[]) {
        super(model,skillName);
        if (skillArr) {
            this.skillArr = skillArr;
        }
    }
    public onSkillEnd(param: any): void {
        const model: ModelBase = param.model;
        if (!super.checkIsSelfModel(model)) {
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
