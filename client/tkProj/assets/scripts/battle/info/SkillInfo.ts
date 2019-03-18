import {ESkillType,ECamp,ERCType} from "../utils/UtilsEnum"
import SkillAi from "../ai/SkillAiBase"
import {AttackInfo} from "./AttackInfo"
/**
 * @interface 技能属性
 */
export interface ISkillAttr{
    skillId:number,
    skillType:ESkillType,           //技能类型
    skillAtkId:number,              //技能对应的攻击包
    skillAi:SkillAi,                //技能ai脚本
    filterId:number,                //技能选敌id
    beforeFrame?:number,              //技能前摇帧数(此阶段可以被打断)
}
/**
 * @interface 攻击包的选敌方式
 */
export interface IFilterInfo{
    camp:ECamp,                     //选择阵营
    atkNum:number,                  //选敌人数
    rcType:ERCType,                  //选敌行、列类型
}
/**
 * @class SkillInfo
 * @author YeXiao
 * @deprecated 英雄战斗技能相关数据
 * @since 2019-3-15 15:58:13
 */
export class SkillInfo {
    private readonly _skillAttr:ISkillAttr = null;
    private readonly _filterInfo:IFilterInfo = null;
    constructor(skillAttr:ISkillAttr)
    {
        this._skillAttr = skillAttr;
    }
    get SkillInfo():ISkillAttr{
        return this._skillAttr;
    }
    getAttackInfo():AttackInfo{
        //test
        let atkInfo = new AttackInfo(this._skillAttr.skillAtkId);
        return atkInfo;
    }
}