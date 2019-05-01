import { DBBuffs } from "../../../db/DBBuffs";
import ConstValue from "../../ConstValue";
import { BuffInfo, IBuffAttr } from "../../info/BuffInfo";
import { EBuffType } from "../../utils/UtilsEnum";
import ModelBase from "../ModelBase";
import BaseComponent from "./BaseComponent";

/**
 * @class BuffComponent
 * @author YeXiao
 * @deprecated 角色模型中的buff组件、主要是buff属性的变化及逻辑处理
 * @since 2019-4-16 18:11:50
 *
 */
export default class BuffComponent extends BaseComponent {
    private buffList: {[index: number]: BuffInfo[]} = null; // 英雄身上buff(index其实是EBuffType类型)
    constructor(model: ModelBase) {
        super(model);
        this.buffList = {};
    }
    /**
     * - 更新buff相关数据
     */
    public update() {
        for (const key in this.buffList) {
            if (this.buffList[key]) {
                // 倒序，方便删除
                for (let index = this.buffList[key].length -1; index >= 0; index--) {
                    const element = this.buffList[key][index];
                    element.updateBuffFrame();
                    if (!element.checkIsActive()) {
                        // 移除buff产生的效果
                        if (this.Model.checkIsAlive()) {
                            this.Model.removeOneBuffValue(element);
                        }
                        // 然后再从数组里面失效buff
                        this.buffList[key].splice(index, 1);
                    }
                }
            }
        }
    }
    /**
     * @description 返回符合类型的buff数组
     * @param buffType EBuffType类型
     */
    public getBuffListByEBuffType(buffType: EBuffType): BuffInfo[] {
        if (this.buffList[buffType]) {
            return this.buffList[buffType];
        }
        return null;
    }
    /**
     * - 添加一个buff
     * @param buffId
     */
    public executeOneBuff(buffId: string): boolean {
        // test
        const buffDB = DBBuffs.getInstance().getDBBuffsById(buffId);
        const buffList = this.getBuffListByEBuffType(buffDB.buffType);
        let canAdd = false;
        // buff替换
        if (buffDB.step === 1) {
            if (buffList) {
                this.buffList[buffDB.buffType].splice(0, buffList.length);
            } else {
                this.buffList[buffDB.buffType] = [];
            }
            canAdd = true;
        } else {
            if (!buffList ) {
                canAdd = true;
                this.buffList[buffDB.buffType] = [];
            } else if (buffList.length < buffDB.step) {
                canAdd = true;
            }
        }
        if (canAdd) {
            const buffAttr: IBuffAttr = {buffId, buffType: buffDB.buffType, buffValue: 0, creaseType: buffDB.creaseType, currFrame: buffDB.round};
            // test 根据buff计算buff最终产生的值，这个值与需要传给影响的英雄，只计算一次
            buffAttr.buffValue = 0;
            const buffInfo = new BuffInfo(buffAttr, this.Model);
            // 改变角色属性
            if (this.Model.checkIsAlive()) {
                this.Model.addOneBuffValue(buffInfo);
            }
            this.buffList[buffDB.buffType].push(buffInfo);
        }
        return false;
    }
    /**
     * @returns 检查是否有不可攻击的buff
     */
    public checkHaveUnAttackBuff() {
        // 检查是否有不可攻击的buff
        for (const key in ConstValue.UN_ATK_BUFF_LIST) {
            if (this.buffList[key] && this.buffList[key].length > 0 ) {
                return true;
            }
        }
        return false;
    }
    /**
     * - 清理某种buff类型
     * @param buffType buff 类型
     */
    public clearOneKindOfBuff(buffType: EBuffType) {
        if (this.buffList[buffType]) {
            // 移除buff效果
            if (this.Model.checkIsAlive()) {
                for (const iterator of this.buffList[buffType]) {
                    this.Model.removeOneBuffValue(iterator);
                }
            }
            this.buffList[buffType] = null;
        }
    }
}
