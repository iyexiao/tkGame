import ModelBase from "../../model/ModelBase";
import SkillAiBase from "../AiBase";
import { IDBSkill } from "../../../db/DBSkill";

/**
 * @class DWPassiveSkill
 * @author YeXiao
 * @deprecated 典韦被动，每受到一次攻击，增加5%的防御力，持续2回合，最多可叠加5层
 * @param skillArr 第一个参数为增加的buffid
 * @since 2019-5-17 19:04:17
 */
export default class DWPassiveSkill extends SkillAiBase {
    constructor(model: ModelBase, skillDB: IDBSkill) {
        super(model, skillDB);
    }
    public onSkillHurt(param: any): void {
        if (!super.checkHaveExtInfo()) {
            return;
        }
        const extInfo = super.getSkillExtInfo();
        const model: ModelBase = param.model;
        if (!super.checkIsSelfModel(model)) {
            return;
        }
        if (model.checkIsAlive()) {
            model.BuffCom.executeOneBuff(extInfo[0]);
        }
    }
}
