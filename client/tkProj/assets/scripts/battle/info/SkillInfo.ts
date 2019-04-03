import {ESkillType,ECamp,ERCType} from "../utils/UtilsEnum"
import SkillAi from "../ai/AiBase"
import {AttackInfo} from "./AttackInfo"
import ModelBase from "../model/ModelBase";
import { IDBFilter, DBFilter } from "../../db/DBFilter";
import ConstValue from "../ConstValue";
import { IDBSkill } from "../../db/DBSkill";
import AiConst from "../ai/AiConst";

/**
 * - 战斗内技能需要改变的值
 */
interface ISkillAttr{
    beforeFrame?:number,            //技能前摇帧数(此阶段可以被打断)
    totalFrame?:number,             //技能释放总时长
}
/**
 * @class SkillInfo
 * @author YeXiao
 * @deprecated 英雄战斗技能相关数据
 * @since 2019-3-15 15:58:13
 */

// let skillAi = new AiConst[_skillDB.extScript](_skillDB.extInfo);

// let skillAttr:ISkillAttr = {skillId:1,skillType:2,skillAtkId:3,filterId:1,skillAi:skillAi,totalFrame:5};
export class SkillInfo {
    private readonly _skillDB:IDBSkill = null;
    private readonly _filterDB:IDBFilter = null;
    private readonly _skillAi:SkillAi = null;
    private _skillAttr:ISkillAttr = null;
    private _owner:ModelBase = null;
    constructor(skillDB:IDBSkill)
    {
        this._skillDB = skillDB;
        this._filterDB = DBFilter.getInstance().getDBFilterById(<string><null>skillDB.filter);
        // console.log("name:" + skillDB.extScript);
        this._skillAi = new AiConst[skillDB.extScript](skillDB.extInfo);
    }
    get SkillDB():IDBSkill{
        return this._skillDB;
    }
    get SkillAttr():ISkillAttr{
        return this._skillAttr;
    }
    /**
     * 更新技能释放信息
     * @param isInit 
     * @returns 是否是技能释放结束
     */
    updateSkillAttr(target?:ModelBase):boolean{
        if (target) {
            this._owner = target;
            this._skillAttr = {beforeFrame:this._skillDB.beforeFrame,totalFrame:this._skillDB.totalFrame};
        }else{
            if (this._skillAttr.beforeFrame > 0) {
                this._skillAttr.beforeFrame = this._skillAttr.beforeFrame - 1;
                if (this._skillAttr.beforeFrame == 0) {
                    //技能释放出去 TODO:检查释放着死亡了没有
                    if(this._owner){
                        this._owner.realGiveOneSkill();
                    }
                }
            }
            if (this._skillAttr.totalFrame > 0) {
                this._skillAttr.totalFrame = this._skillAttr.totalFrame - 1;
                if (this._skillAttr.totalFrame == 0) {
                    this._skillAttr = null;
                    return true;
                }
            }
        }
        return false;
    }
    /**
     * - 返回攻击包信息
     * @returns AttackInfo
     */
    getAttackInfo():AttackInfo{
        //test
        let atkInfo = new AttackInfo(this._skillDB.atk);
        return atkInfo;
    }
    /**
     * - 获取技能脚本
     * @returns 技能脚本
     */
    getSkillAi():SkillAi{
        return this._skillAi;
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
        let protList = []
        let sTypeList = ConstValue.GAME_ROW_LIST;//默认按行选敌
        if (this._filterDB.sType == ERCType.column) {
            sTypeList = ConstValue.GAME_COL_LIST;
            this._filterDB.cProt.forEach(element => {
                protList.push(<number><unknown>element);
            });
        }else{
            this._filterDB.rProt.forEach(element => {
                protList.push(<number><unknown>element);
            });
        }
        let campList = owner.Ctrl.getModelListByCamp(camp,sTypeList);
        let _list:Array<ModelBase> = new Array<ModelBase>();
        //根据选敌人数判断是否需要跨条件选敌(补足敌人)
        for (let index = 0; index < protList.length; index++) {
            const tmpProtList = campList[protList[index]];
            if(tmpProtList.length >= this._filterDB.num){
                //足够选人了，
                _list = owner.Ctrl.BattleCtrl.RandomCtrl.getRandomsInArrayByCount(tmpProtList,this._filterDB.num);
                break
            }else{
                let _count = _list.length;
                if (_count == 0) {
                    _list = tmpProtList;
                }else{
                    if(this._filterDB.needAll == 1 && _count < this._filterDB.num){
                        //需要补足
                        let tmpList = owner.Ctrl.BattleCtrl.RandomCtrl.getRandomsInArrayByCount(tmpProtList,this._filterDB.num - _count);
                        _list = _list.concat(tmpList);
                        //补足了
                        if(_list.length == this._filterDB.num){
                            break;
                        }
                    }
                }
                // 不需要补足并且已经存在选的敌人了，则返回
                if (_list.length > 0 && this._filterDB.needAll == 0) {
                    break;
                }
            }
        }
        

        return _list;
    }
}