import {ESkillType,ECreaseType} from "../utils/UtilsEnum"
import SkillAi from "../ai/SkillAiBase"
/**
 * @interface 技能属性
 */
export interface ISkillAttr{
    skillId:number,
    skillType:ESkillType,         //技能类型
    skillAtkId:number,           //技能对应的攻击包
    skillAi:SkillAi,         //技能ai脚本
}

/**
 * @class SkillInfo
 * @author YeXiao
 * @deprecated 英雄战斗技能相关数据
 * @since 2019-3-15 15:58:13
 */
export class SkillInfo {
    private readonly _skillAttr:ISkillAttr = null;
    constructor(skillAttr:ISkillAttr)
    {
        this._skillAttr = skillAttr;
    }
}