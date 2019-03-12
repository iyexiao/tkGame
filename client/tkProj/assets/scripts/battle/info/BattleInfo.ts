/**
 * @class BattleInfo
 * @author YeXiao
 * @deprecated 进战斗对应的json数据对象
 * @date 2019年3月11日11:53:01
 * 
 */

export interface IHeroInfo {
    readonly hId:number,
    readonly level:number,
    readonly star:number,
    readonly quality:number,
}
export interface IUserInfo {
    readonly userId:number,
    readonly userType:number,
    readonly camp:number,
    readonly heros:Array<IHeroInfo>,
}
export interface IBattleInfo {
    readonly battleId:number,
    readonly randomSeed:number,
    readonly gameMode:number,
    readonly userId:number,
    readonly users:Array<IUserInfo>,
}

// export default class BattleInfo {
//     private _battleInfo:IBattleInfo = null;

//     constructor(battleInfo:IBattleInfo)
//     {
//         // JSON.parse(jsonData);
//         this._battleInfo = battleInfo;
//     }
// }