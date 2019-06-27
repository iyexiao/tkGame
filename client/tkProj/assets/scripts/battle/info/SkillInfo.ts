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
    atkFrame: number[];              // 技能伤害帧
    buffFrame: number;               // 技能buff帧
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
    private readonly owner: ModelBase = null;
    private skillAttr: ISkillAttr = null;
    private currAtkInfo: AttackInfo = null;
    private skillCD: number = 0; // 技能CD
    constructor(skillDB: IDBSkill, model: ModelBase) {
        this.skillDB = skillDB;
        this.filterDB = DBFilter.getInstance().getDBFilterById(String(skillDB.filter));
        this.owner = model;
        const script = this.skillDB.extScript;
        if (AiConst[script]) {
            this.skillAi = new AiConst[script](model, script, this.skillDB.extInfo, model);
        }else {
            console.error("not have aiscript: ",skillDB.name);
        }
    }
    get SkillDB(): IDBSkill {
        return this.skillDB;
    }
    get SkillAttr(): ISkillAttr {
        return this.skillAttr;
    }
    get CurrrAtkInfo(): AttackInfo {
        return this.currAtkInfo;
    }
    get SkillCD(): number {
        return this.skillCD;
    }
    public updateSkillCD() {
        if (this.skillCD > 0) {
            this.skillCD = this.skillCD - 1;
        }
    }
    /**
     * - 初始化技能信息(在获取可释放的技能的时候，就装卸这个技能信息了)
     */
    public loadSkillAttr() {
        const currentFrame = this.owner.Ctrl.CurrentFrame;
        const frame: number[] = [];
        for (const iterator of this.SkillDB.atkFrame) {
            const f = Number(iterator);
            frame.push( f + currentFrame );
        }
        this.skillAttr = {atkFrame: frame, buffFrame: this.skillDB.buffFrame + currentFrame, beforeFrame: this.skillDB.beforeFrame, totalFrame: this.skillDB.totalFrame};
    }
    /**
     * 更新技能释放信息
     * @param isInit
     * @returns 是否是技能释放结束
     */
    public updateSkillAttr(target?: ModelBase): boolean {
        const currentFrame = this.owner.Ctrl.CurrentFrame;
        if (this.skillAttr.beforeFrame > 0) {
            this.skillAttr.beforeFrame = this.skillAttr.beforeFrame - 1;
            if (this.skillAttr.beforeFrame === 0) {
                // 技能释放出去 TODO:检查释放着死亡了没有
                this.owner.realGiveOneSkill();
            }
        }
        // note:如果攻击包和buff帧同一帧，则先放攻击包才会再放buff
        for (const iterator of this.skillAttr.atkFrame) {
            if (currentFrame === iterator ) {
                // 释放攻击包
                if (!this.currAtkInfo) {
                    this.loadAttackInfo();
                }
                this.owner.giveOutOneSkillAtk();
            }
        }
        if (currentFrame === this.skillAttr.buffFrame && this.skillDB.buffs.length > 0) {
            for (const iterator of this.skillDB.buffs) {
                this.owner.BuffCom.executeOneBuff(iterator);
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
    /**
     * - 攻击包信息
     */
    public loadAttackInfo() {
        const damage = this.owner.HeroInfo.getHeroAtk();
        this.currAtkInfo = new AttackInfo(this.skillDB.atk, damage);
    }
    /**
     * - 重置攻击包信息
     */
    public resetAtkInfo() {
        this.currAtkInfo = null;
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
    public getChooseModelList(): ModelBase[] {
        const ctrl = this.owner.Ctrl;
        let camp = this.owner.getHeroCamp();
        // 选敌方阵营
        if (this.filterDB.camp === ECamp.camp1) {
            camp = camp === ECamp.camp1 ? ECamp.camp2 : ECamp.camp1;
        }
        const protList = [];
        let sTypeList = ConstValue.GAME_ROW_LIST; // 默认按排选敌
        if (this.filterDB.sType === ERCType.column) {
            sTypeList = ConstValue.GAME_COL_LIST;
            this.filterDB.cProt.forEach((element) => {
                protList.push(Number((element)));
            });
        } else {
            this.filterDB.rProt.forEach((element) => {
                protList.push(Number((element)));
            });
        }
        const campList = ctrl.getProtModelListByCamp(camp, sTypeList);
        let list: ModelBase[] = new Array<ModelBase>();
        // 根据选敌人数判断是否需要跨条件选敌(补足敌人)
        for (const iterator of protList) {
            const tmpProtList = campList[iterator];
            if (tmpProtList.length >= this.filterDB.num) {
                // 足够选人了，
                list = ctrl.BattleCtrl.RandomCtrl.getRandomsInArrayByCount(tmpProtList, this.filterDB.num);
                break;
            } else {
                const count = list.length;
                if (count === 0) {
                    list = tmpProtList;
                } else {
                    if (this.filterDB.needAll === 1 && count < this.filterDB.num) {
                        // 需要补足
                        const tmpList = ctrl.BattleCtrl.RandomCtrl.getRandomsInArrayByCount(tmpProtList, this.filterDB.num - count);
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
