import ModelBase from "../model/ModelBase";
import { ECamp, ERCType } from "../utils/UtilsEnum";
import ConstValue from "../ConstValue";
import { IDBSkill } from "../../db/DBSkill";
import { DBFilter, IDBFilter } from "../../db/DBFilter";
/**
 * @class SkillAiBase
 * @author YeXiao
 * @deprecated 英雄战斗技能AI接口,添加新技能ai脚本的时候，需要在AiConst.ts里面声明
 * @since 2019-3-15 15:58:13
 */
export default abstract class SkillAiBase {
    private readonly skillDB: IDBSkill = null;
    private readonly filterDB: IDBFilter = null;
    private readonly playerModel: ModelBase = null;
    constructor(model: ModelBase, skillDB: IDBSkill) {
        this.skillDB = skillDB;
        this.playerModel = model;
        this.filterDB = DBFilter.getInstance().getDBFilterById(String(skillDB.filter));
    }
    get PlayerModel() {
        return this.playerModel;
    }
    get SkillName(): string {
        return this.skillDB.extScript;
    }
    /**
     * @description 获取技能额外参数，有可能返回空的数组
     */
    getSkillExtInfo(): string[] {
        return this.skillDB.extInfo;
    }
    /**
     * @description 检查是否有技能额外参数
     */
    public checkHaveExtInfo(): boolean {
        if (!this.skillDB.extInfo || this.skillDB.extInfo.length === 0) {
            return false;
        }
        return true;
    }
    /**
     * @description 判断传入角色是否是自身
     * @param otherModel 
     */
    public checkIsSelfModel(otherModel: ModelBase): boolean {
        if (!otherModel || !this.playerModel) {
            return false;
        }
        if (otherModel === this.playerModel) {
            return true;
        }
        return false;
    }
    /**
     * @description 技能选择攻击对象数组(有可能为0)
     * @returns Array<ModelBase>
     */
    public chooseTarget(): ModelBase[] {
        const ctrl = this.playerModel.Ctrl;
        let camp = this.playerModel.getHeroCamp();
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
    /**
     * @description 技能开始做选敌逻辑前
     * @param model 攻击的英雄
     */
    public onBeforeChooseTarget(model:ModelBase): void {}
    /**
     * @description 当一个英雄开始攻击时
     * @param model 攻击的英雄
     */
    public onAttackStart(model: ModelBase): void {}
    /**
     * @description 当一个英雄攻击结束时
     * @param model 攻击的英雄
     */
    public onAttackEnd(model: ModelBase): void {}
    /**
     * - 当一个英雄释放一个技能
     * @param {model}  释放技能的英雄
     */
    public onSkillStart(param: any): void {}
    /**
     * - 当一个英雄技能释放完毕
     * @param {model} 释放技能的英雄
     */
    public onSkillEnd(param: any): void {}
    /**
     * - 当英雄受到技能伤害时(一个技能只会触发一次)
     * @param param 
     */
    public onSkillHurt(param: any): void {}
    /**
     * @description 当一个英雄受到攻击时
     * @param model 受击的英雄
     */
    public onDefend(model: ModelBase): void { }
    /**
     * @description 当有英雄属性变化时
     * @param model 属性变化的英雄
     */
    public onPropChange(model: ModelBase): void { }
    /**
     * @description 当一个英雄死亡时
     * @param model 死亡的英雄
     */
    public onDead(model: ModelBase): void { }
    /**
     * @description 当一个英雄被击杀时
     * @param model 被击杀的英雄
     */
    public onKill(model: ModelBase): void { }
}
