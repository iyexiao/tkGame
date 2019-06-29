import ModelBase from "../../model/ModelBase";
import SkillAiBase from "../AiBase";
import { IDBSkill } from "../../../db/DBSkill";

/**
 * @class DWAuraSkill
 * @author YeXiao
 * @deprecated 典韦光环
 * @since 2019-5-17 19:03:55
 */
export default class DWAuraSkill extends SkillAiBase {
    constructor(model: ModelBase, skillDB: IDBSkill) {
        super(model, skillDB);
    }
}
