import ModelBase from "../model/ModelBase";
import {ECreaseType,EPropType} from "../utils/UtilsEnum";
/**
 * @interface buff属性
 */
export interface IBuffAttr {
    buffId: number;
    buffType: EBuffType;         // buff类型
    buffValue: number;           // buff产生的效果值
    propType: EPropType;         // buff效果值加成方式
    creaseType: ECreaseType;     // buff增益减益类型
    duration?: number;            // buff持续时间(无代表永久)
}
/**
 * @enum buff类型
 */
export enum EBuffType{
    hp = 1,      // 血量
    phyAtk,      // 物攻
    phyDef,      // 物防
    magicAtk,    // 魔攻
    magicDef,    // 魔防
    crit,        // 暴击
    atkSpeed,    // 攻速
    block,       // 格挡
    silent,                 // 沉默(无法放技能)
    stun,                   // 击晕(无法攻击)
    forzen,                 // 冰冻(无法攻击)
}

/**
 * @class BuffInfo
 * @author YeXiao
 * @deprecated 英雄战斗用的buff数据
 * @since 2019-3-13 14:26:39
 */
export class BuffInfo {
    private readonly buffAttr: IBuffAttr = null;   // buff属性
    private readonly ownerModel: ModelBase = null; // buff释放者
    constructor(buffAttr: IBuffAttr, ownerModel: ModelBase) {
        this.buffAttr = buffAttr;
        this.ownerModel = ownerModel;
    }
}
