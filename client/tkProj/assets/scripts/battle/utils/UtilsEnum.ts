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