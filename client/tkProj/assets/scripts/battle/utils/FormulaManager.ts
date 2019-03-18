import ModelBase from "../model/ModelBase";
import { SkillInfo } from "../info/SkillInfo";
import { IDamageInfo } from "../info/DamageInfo";

/**
 * @class FormulaManager
 * @author YeXiao
 * @deprecated 战斗公式单例
 * @since 2019-3-12 17:15:30
 * 
 */
export default class FormulaManager {
    static _instance:FormulaManager = null;
    static getInstance():FormulaManager{
        if( FormulaManager._instance == null ){
            FormulaManager._instance = new FormulaManager();
        }
        return FormulaManager._instance;
    }
    /**
     * 获取技能伤害值
     */
    getSkillDamage(atkerMd:ModelBase,deferMd:ModelBase,skill:SkillInfo):IDamageInfo{
        let dmgInfo:IDamageInfo = {damage:10,isCrit:false,isHit:true,isKilled:false};
        return dmgInfo;
	}
}