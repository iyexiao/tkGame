import ModelBase from "../../model/ModelBase";
import SkillAiBase from "../AiBase";
import { IDBSkill } from "../../../db/DBSkill";

/**
 * @class CCNormalSkill
 * @author YeXiao
 * @deprecated 曹操普攻技能
 * - 随机选取前排（无则选中排，无再选后排）一名敌人进行攻击。
 * @since 2019-3-23 22:04:26
 */
export default class CCNormalSkill extends SkillAiBase {
    constructor(model: ModelBase, skillDB: IDBSkill) {
        super(model, skillDB);
    }
}
