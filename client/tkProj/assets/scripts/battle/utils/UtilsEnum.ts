/**
 * @enum 游戏模式
 */
export enum EGameMode {
    pve = 1,
    pvp,
}
/**
 * @enum 游戏阶段
 */
export enum EGameStep {
    wait = 1,
    ready,
    battle,
    result,
}
/**
 * @enum 玩家类型
 */
export enum EUserType {
    user = 1,
    robot,
}
/**
 * @enum 玩家所属阵营
 */
export enum ECamp {
    camp1 = 0,
    camp2,
}
/**
 * @enum 属性加成方式
 */
export enum EPropType {
    addSub = 0,     // 纯数值
    percentAge,     // 百分比
}
/**
 * @enum 增益还是减益
 */
export enum ECreaseType {
    increase = 0,        // 增益
    decrease,            // 减益
}
/**
 * @enum 技能类型
 */
export enum ESkillType {
    normal = 0, // 普攻
    small,      // 小技能
    big,        // 大招
    passive,    // 被动技能
    aura,       // 光环技能
}
/**
 * @enum 战斗时机事件
 */
export enum EBattleTrigger {
    onSkillStart = "onSkillStart",  // 技能攻击前
    onSkillEnd = "onSkillEnd",      // 技能攻击后
    onGiveOutAtk = "onGiveOutAtk",  // 攻击包释放
    onHurt = "onHurt",              // 受击时
    onPropChange = "onHurt",        // 属性变化时
    onDead = "onDead",              // 角色死亡时
    onKill = "onKill",              // 击杀角色时
}
/**
 * @enum 选敌行列方式
 */
export enum ERCType {
    row = 0,        // 行
    column,         // 列
}
