import ModelBase from "../../model/ModelBase";
import SkillAiBase from "../AiBase";
import { IDBSkill } from "../../../db/DBSkill";

/**
 * @class CCAuraSkill
 * @author YeXiao
 * @deprecated 曹操光环
 * @since 2019-3-25 11:07:00
 */
export default class CCAuraSkill extends SkillAiBase {
    constructor(model: ModelBase, skillDB: IDBSkill) {
        super(model, skillDB);
    }
}
