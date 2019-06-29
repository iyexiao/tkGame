import ModelBase from "../../model/ModelBase";
import SkillAiBase from "../AiBase";
import { IDBSkill } from "../../../db/DBSkill";

/**
 * @class CCSmallSkill
 * @author YeXiao
 * @deprecated 曹操小技能，对前排所有英雄攻击进行攻击（前排无人选中排），并对敌人施加减防buff
 * @since 2019-3-23 22:04:26
 */
export default class CCSmallSkill extends SkillAiBase {
    constructor(model: ModelBase, skillDB: IDBSkill) {
        super(model, skillDB);
    }
    public onSkillEnd(param: any): void {
        if (!super.checkHaveExtInfo()) {
            return;
        }
        const extInfo = super.getSkillExtInfo();
        const model: ModelBase = param.model;
        if (super.checkIsSelfModel(model)) {
            return;
        }
        const list = this.PlayerModel.SkillCom.getChooseModelList();
        list.forEach(element => {
            if (element.checkIsAlive()) {
                element.BuffCom.executeOneBuff(extInfo[0]);
            }
        });
    }
}
