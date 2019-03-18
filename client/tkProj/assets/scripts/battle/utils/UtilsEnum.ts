/** 
 * @enum 游戏模式
*/
export enum EGameMode{
    pve = 1,
    pvp,
}
/** 
 * @enum 游戏阶段
*/
export enum EGameStep{
    wait = 1,
    ready,
    battle,
    result,
}
/** 
 * @enum 玩家类型
*/
export enum EUserType{
    user = 1,
    robot,
}
/** 
 * @enum 玩家所属阵营
*/
export enum ECamp{
    camp1 = 0,
    camp2,
}
/**
 * @enum 属性加成方式
 */
export enum EPropType{
    addSub = 1,     //纯数值
    percentAge,     //百分比
}
/**
 * @enum 增益还是减益
 */
export enum ECreaseType{
    increase,        //增益
    decrease,        //减益
}
/**
 * @enum 技能类型
 */
export enum ESkillType{
    normal = 0, //普攻
    small,      //小技能
    big,        //大招
    passive,    //被动技能
    aura,       //光环技能
}
/**
 * @enum 战斗时机
 */
export enum EBattleTrigger{
    atkStart = 0, //技能攻击前
    atkEnd,         //技能攻击后
    onHurt,         //受击时
    propChange,     //属性变化时
    onDead,         //角色死亡时
    onKill,         //击杀角色时
}
/**
 * @enum 选敌行列方式
 */
export enum ERCType{
    row = 0,        //行
    column,         //列
}
