/**
 * @enum 游戏模式
 */
export enum EGameType {
    view = 1, //带视图
    dummy,
}
/**
 * @enum 竞技模式
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
    onBeforeChooseTarget = "onBeforeChooseTarget",  // 技能选敌前
    onSkillStart = "onSkillStart",  // 技能攻击前
    onSkillEnd = "onSkillEnd",      // 技能攻击后
    onGiveOutAtk = "onGiveOutAtk",  // 攻击包释放
    onSkillHurt = "onSkillHurt",    // 受到技能伤害时(第一个攻击包到达)
    onPropChange = "onPropChange",  // 属性变化时
    onBuffExchange = "onBuffExchange", // buff产生变化(增加或者减少)
    onDead = "onDead",              // 角色死亡时
    onKill = "onKill",              // 击杀角色时
    onRoundStart= "onRoundStart",    // 当一个回合开始
    onRoundEnd= "onRoundEnd",        // 当一个回合结束
}
/**
 * @enum 选敌行列方式
 */
export enum ERCType {
    row = 0,        // 行
    column,         // 列
}
/**
 * @enum buff类型
 */
export enum EBuffType {
    hp = 1,      // 血量
    maxHp,       // 血量上限
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
    sign,        // 标记
}
