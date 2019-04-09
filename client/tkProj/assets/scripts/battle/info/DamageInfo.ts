/**
 * @interface IDamageInfo
 * @author YeXiao
 * @deprecated 伤害数值
 * @since 2019-3-18 14:14:00
 *
 */
export interface IDamageInfo {
    readonly damage: number;     // 伤害值
    readonly isCrit: boolean;    // 是否暴击
    readonly isHit: boolean;     // 是否命中
    readonly isKilled: boolean;  // 是否击杀
}
