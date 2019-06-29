import { DBBuffs } from "../../db/DBBuffs";
import ModelBase from "../model/ModelBase";
import {EBuffType, ECreaseType, EPropType} from "../utils/UtilsEnum";
import { EHeroAttr } from "./HeroInfo";
/**
 * @interface buff属性
 */
export interface IBuffAttr {
    buffId: string;
    buffType: EBuffType;         // buff类型
    buffValue: number;           // buff产生的最终效果值(不论百分比还是加减，最终都转换为一个值来处理，这个值是正值，然后增减益来判定)
    creaseType: ECreaseType;     // buff增益减益类型
    currFrame: number;            // buff持续时间(无代表永久)
}

/**
 * @class BuffInfo
 * @author YeXiao
 * @deprecated 英雄战斗用的buff数据
 * @since 2019-3-13 14:26:39
 */
export class BuffInfo {
    private buffAttr: IBuffAttr = null;   // buff属性
    private readonly ownerModel: ModelBase = null; // buff释放者
    private readonly buffDB: DBBuffs = null;        // buff配置表
    private isActive: boolean = false;          // 是否激活
    constructor(buffAttr: IBuffAttr, ownerModel: ModelBase) {
        this.buffAttr = buffAttr;
        this.ownerModel = ownerModel;
        this.isActive = true;
    }
    /**
     * - buff产生的最终值
     */
    getBuffValue() {
        return this.buffAttr.buffValue;
    }
    /**
     * - buff产生类型
     */
    getBuffType(): EHeroAttr {
        let result: EHeroAttr = null;
        switch (this.buffAttr.buffType) {
            case EBuffType.hp:
                result = EHeroAttr.hp;
                break;
            case EBuffType.phyAtk:
                result = EHeroAttr.phyAtk;
                break;
            case EBuffType.phyDef:
                result = EHeroAttr.phyDef;
                break;
            case EBuffType.magicAtk:
                result = EHeroAttr.magicAtk;
                break;
            case EBuffType.magicDef:
                result = EHeroAttr.magicDef;
                break;
            case EBuffType.atkSpeed:
                result = EHeroAttr.atkSpeed;
                break;
            case EBuffType.crit:
                result = EHeroAttr.crit;
                break;
            case EBuffType.block:
                result = EHeroAttr.block;
                break;
            default:
                break;
        }
        return result;
    }
    /**
     * 更新buff的时间
     */
    public updateBuffFrame() {
        if (!this.isActive) {
            return;
        }
        if (this.buffAttr.currFrame > 0) {
            this.buffAttr.currFrame = this.buffAttr.currFrame - 1;
        }
        if (this.buffAttr.currFrame === 0) {
            // 此处只标记为失效，然后再buffcomponent里面做移除
            this.isActive = false;
        }
    }
    /**
     * - 是否是增益buff true:是
     */
    public checkBuffIsIncrease(): boolean {
        return (this.buffAttr.creaseType == ECreaseType.increase);
    }
    /**
     * - 检查buff是否激活
     */
    public checkIsActive(): boolean {
        return this.isActive;
    }
}
