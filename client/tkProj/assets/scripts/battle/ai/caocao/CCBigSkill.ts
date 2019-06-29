import ModelBase from "../../model/ModelBase";
import SkillAiBase from "../AiBase";
import { IDBSkill } from "../../../db/DBSkill";

/**
 * @class CCBigSkill
 * @author YeXiao
 * @deprecated 曹操大招,对前排所有英雄攻击进行攻击（前排无人选中排），并回复自身血量（当前攻击力*15%）
 * @since 2019-3-25 11:07:00
 */
export default class CCBigSkill extends SkillAiBase {
    constructor(model: ModelBase, skillDB: IDBSkill) {
        super(model, skillDB);
    }
    public onSkillEnd(param: any): void {
        if (!super.checkHaveExtInfo()) {
            return;
        }
        const extInfo = super.getSkillExtInfo();
        const model: ModelBase = param.model;
        if (!super.checkIsSelfModel(model)) {
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
