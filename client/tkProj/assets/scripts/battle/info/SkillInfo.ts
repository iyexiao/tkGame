import { DBFilter, IDBFilter } from "../../db/DBFilter";
import { IDBSkill } from "../../db/DBSkill";
import SkillAi from "../ai/AiBase";
import AiConst from "../ai/AiConst";
import ConstValue from "../ConstValue";
import ModelBase from "../model/ModelBase";
import {ECamp, ERCType} from "../utils/UtilsEnum";
import {AttackInfo} from "./AttackInfo";

/**
 * - 战斗内技能需要改变的值
 */
interface ISkillAttr {
    beforeFrame?: number;            // 技能前摇帧数(此阶段可以被打断)
    totalFrame?: number;             // 技能释放总时长
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
    private readonly skillDB: IDBSkill = null;
    private readonly filterDB: IDBFilter = null;
    private readonly skillAi: SkillAi = null;
    private skillAttr: ISkillAttr = null;
    private owner: ModelBase = null;
    constructor(skillDB: IDBSkill) {
        this.skillDB = skillDB;
        this.filterDB = DBFilter.getInstance().getDBFilterById(skillDB.filter as null as string);
        this.skillAi = new AiConst[skillDB.extScript](skillDB.extInfo);
    }
    get SkillDB(): IDBSkill {
        return this.skillDB;
    }
    get SkillAttr(): ISkillAttr {
        return this.skillAttr;
    }
    /**
     * 更新技能释放信息
     * @param isInit 
     * @returns 是否是技能释放结束
     */
    public updateSkillAttr(target?: ModelBase): boolean {
        if (target) {
            this.owner = target;
            this.skillAttr = {beforeFrame: this.skillDB.beforeFrame, totalFrame: this.skillDB.totalFrame};
        } else {
            if (this.skillAttr.beforeFrame > 0) {
                this.skillAttr.beforeFrame = this.skillAttr.beforeFrame - 1;
                if (this.skillAttr.beforeFrame == 0) {
                    // 技能释放出去 TODO:检查释放着死亡了没有
                    if (this.owner) {
                        this.owner.realGiveOneSkill();
                    }
                }
            }
            if (this.skillAttr.totalFrame > 0) {
                this.skillAttr.totalFrame = this.skillAttr.totalFrame - 1;
                if (this.skillAttr.totalFrame === 0) {
                    this.skillAttr = null;
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
    public getAttackInfo(): AttackInfo {
        // test
        const atkInfo = new AttackInfo(this.skillDB.atk);
        return atkInfo;
    }
    /**
     * - 获取技能脚本
     * @returns 技能脚本
     */
    public getSkillAi(): SkillAi {
        return this.skillAi;
    }
    /**
     * - 获取技能的攻击对象数组(有可能为0)
     * @returns Array<ModelBase>
     */
    public getChooseModelList(owner: ModelBase): ModelBase[] {

        let camp = owner.getHeroCamp();
        // 选敌方阵营
        if (this.filterDB.camp == ECamp.camp1) {
            camp = camp == ECamp.camp1 ? ECamp.camp2 : ECamp.camp1;
        }
        const protList = [];
        let sTypeList = ConstValue.GAME_ROW_LIST; // 默认按行选敌
        if (this.filterDB.sType === ERCType.column) {
            sTypeList = ConstValue.GAME_COL_LIST;
            this.filterDB.cProt.forEach((element) => {
                protList.push(element as unknown as number);
            });
        } else {
            this.filterDB.rProt.forEach((element) => {
                protList.push(element as unknown as number);
            });
        }
        const campList = owner.Ctrl.getModelListByCamp(camp, sTypeList);
        let list: ModelBase[] = new Array<ModelBase>();
        // 根据选敌人数判断是否需要跨条件选敌(补足敌人)
        for (const iterator of protList) {
            const tmpProtList = campList[iterator];
            if (tmpProtList.length >= this.filterDB.num) {
                // 足够选人了，
                list = owner.Ctrl.BattleCtrl.RandomCtrl.getRandomsInArrayByCount(tmpProtList, this.filterDB.num);
                break;
            } else {
                const count = list.length;
                if (count === 0) {
                    list = tmpProtList;
                } else {
                    if (this.filterDB.needAll === 1 && count < this.filterDB.num) {
                        // 需要补足
                        const tmpList = owner.Ctrl.BattleCtrl.RandomCtrl.getRandomsInArrayByCount(tmpProtList, this.filterDB.num - count);
                        list = list.concat(tmpList);
                        // 补足了
                        if (list.length === this.filterDB.num) {
                            break;
                        }
                    }
                }
                // 不需要补足并且已经存在选的敌人了，则返回
                if (list.length > 0 && this.filterDB.needAll === 0) {
                    break;
                }
            }
        }
        return list;
    }
}
