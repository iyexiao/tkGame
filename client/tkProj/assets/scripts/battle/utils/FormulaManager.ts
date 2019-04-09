import { IDamageInfo } from "../info/DamageInfo";
import {SkillInfo} from "../info/SkillInfo";
import ModelBase from "../model/ModelBase";

/**
 * @class FormulaManager
 * @author YeXiao
 * @deprecated 战斗公式单例
 * @since 2019-3-12 17:15:30
 *
 */
export default class FormulaManager {
    public static getInstance(): FormulaManager {
        if ( FormulaManager.instance == null ) {
            FormulaManager.instance = new FormulaManager();
        }
        return FormulaManager.instance;
    }
    private static instance: FormulaManager = null;
    /**
     * 获取技能伤害值
     */
    public getSkillDamage(atkerMd: ModelBase, deferMd: ModelBase, skill: SkillInfo): IDamageInfo {
        const dmgInfo: IDamageInfo = {damage: 10, isCrit: false, isHit: true, isKilled: false};
        return dmgInfo;
    }
}
