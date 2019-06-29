import ModelBase from "../../model/ModelBase";
import SkillAiBase from "../AiBase";
import { IDBSkill } from "../../../db/DBSkill";

/**
 * @class DWBigSkill
 * @author YeXiao
 * @deprecated 典韦大招
 * @since 2019-5-17 19:04:01
 */
export default class DWBigSkill extends SkillAiBase {
    constructor(model: ModelBase, skillDB: IDBSkill) {
        super(model, skillDB);
    }
}
