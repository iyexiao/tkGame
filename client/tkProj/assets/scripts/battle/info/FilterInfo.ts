import { ECamp, ERCType } from "../utils/UtilsEnum";

/**
 * @interface 攻击包的选敌方式
 */
export interface IFilterInfo{
    camp:ECamp,                     //选择阵营
    atkNum:number,                  //选敌人数
    rcType:ERCType,                  //选敌行、列类型
}

/**
 * @class FilterInfo
 * @author YeXiao
 * @deprecated 英雄战斗技能选敌相关
 * @since 2019-3-21 17:54:11
 */
export class FilterInfo {
    
}