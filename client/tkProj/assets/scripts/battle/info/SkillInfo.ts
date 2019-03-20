import {ESkillType,ECamp,ERCType} from "../utils/UtilsEnum"
import SkillAi from "../ai/SkillAiBase"
import {AttackInfo} from "./AttackInfo"
import ModelBase from "../model/ModelBase";
/**
 * @interface 技能属性
 */
export interface ISkillAttr{
    skillId:number,
    skillType:ESkillType,           //技能类型
    skillAtkId:number,              //技能对应的攻击包
    skillAi:SkillAi,                //技能ai脚本
    filterId:number,                //技能选敌id
    beforeFrame?:number,            //技能前摇帧数(此阶段可以被打断)
    totalFrame?:number,             //技能释放总时长
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
    /**
     * - 返回攻击包信息
     * @returns AttackInfo
     */
    getAttackInfo():AttackInfo{
        //test
        let atkInfo = new AttackInfo(this._skillAttr.skillAtkId);
        return atkInfo;
    }
    /**
     * - 获取技能脚本
     * @returns 技能脚本
     */
    getSkillAi():SkillAi{
        return this._skillAttr.skillAi;
    }
    /**
     * - 获取技能的攻击对象数组(有可能为0)
     * @returns Array<ModelBase>
     */
    getChooseModelList(onwer:ModelBase):Array<ModelBase>{
        let _list:Array<ModelBase> = new Array<ModelBase>();

        return _list;
    }
}