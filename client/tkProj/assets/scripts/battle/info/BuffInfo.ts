import { DBBuffs } from "../../db/DBBuffs";
import ModelBase from "../model/ModelBase";
import {EBuffType, ECreaseType, EPropType} from "../utils/UtilsEnum";
/**
 * @interface buff属性
 */
export interface IBuffAttr {
    buffId: string;
    buffType: EBuffType;         // buff类型
    buffValue: number;           // buff产生的最终效果值(不论百分比还是加减，最终都转换为一个值来处理，这个值是正值，然后增减益来判定)
    creaseType: ECreaseType;     // buff增益减益类型
    currRound: number;            // buff持续时间(无代表永久)
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
    constructor(buffAttr: IBuffAttr, ownerModel: ModelBase) {
        this.buffAttr = buffAttr;
        this.ownerModel = ownerModel;
    }
    /**
     * 更新buff的回合数
     */
    public updateBuffFrame() {
        if (this.buffAttr.currRound > 0) {
            this.buffAttr.currRound = this.buffAttr.currRound - 1;
        }
    }
    /**
     * - 检查buff是否失效 true:失效
     */
    public checkBuffIsInvalid(): boolean {
        return false;
    }
}
