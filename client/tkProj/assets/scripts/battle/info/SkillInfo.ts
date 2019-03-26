import {ESkillType,ECamp,ERCType} from "../utils/UtilsEnum"
import SkillAi from "../ai/AiBase"
import {AttackInfo} from "./AttackInfo"
import ModelBase from "../model/ModelBase";
import { IDBFilter, DBFilter } from "../../db/DBFilter";
import ConstValue from "../ConstValue";
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
 * @class SkillInfo
 * @author YeXiao
 * @deprecated 英雄战斗技能相关数据
 * @since 2019-3-15 15:58:13
 */
export class SkillInfo {
    private readonly _skillAttr:ISkillAttr = null;
    private readonly _filterDB:IDBFilter = null;
    constructor(skillAttr:ISkillAttr)
    {
        this._skillAttr = skillAttr;
        this._filterDB = DBFilter.getInstance().getDBFilterById(<null>skillAttr.filterId);
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
    getChooseModelList(owner:ModelBase):Array<ModelBase>{

        let camp = owner.getHeroCamp();
        //选敌方阵营
        if (this._filterDB.camp == ECamp.camp2) {
            camp = camp == ECamp.camp1 ? ECamp.camp2:ECamp.camp1
        }
        let campList = owner.Ctrl.getModelListByCamp(camp);
        let _list:Array<ModelBase> = new Array<ModelBase>();
        let sTypeList = ConstValue.GAME_ROW_LIST;//默认按行选敌
        if (this._filterDB.sType == ERCType.column) {
            sTypeList = ConstValue.GAME_COL_LIST;
        }

        return _list;
    }
}