import { DBBuffs } from "../../../db/DBBuffs";
import ConstValue from "../../ConstValue";
import { BuffInfo, IBuffAttr } from "../../info/BuffInfo";
import { EBuffType } from "../../utils/UtilsEnum";
import ModelBase from "../ModelBase";
import BaseComponent from "./BaseComponent";

/**
 * @class BuffComponent
 * @author YeXiao
 * @deprecated 角色模型中的buff组件
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
            const buffAttr: IBuffAttr = {buffId, buffType: buffDB.buffType, buffValue: 0, creaseType: buffDB.creaseType, currRound: buffDB.round};
            // test
            buffAttr.buffValue = 0;
            const buffInfo = new BuffInfo(buffAttr, this.Model);
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
}
