import {EGameMode,EUserType,ECamp} from "../utils/UtilsEnum"
/**
 * @class BattleInfo
 * @author YeXiao
 * @deprecated 进战斗对应的json数据对象
 * @since 2019-3-12 17:15:30
 * 
 */
/**
 * @interface 进战斗卡牌数据
 */
export interface IHeroInfo {
    readonly hId:number,
    readonly level:number,
    readonly star:number,
    readonly quality:number,
    readonly posIdx:number, //对应的位置
}
/**
 * @interface 进战斗玩家数据
 */
export interface IUserInfo {
    readonly userId:number,
    readonly userName:string,
    readonly userType:EUserType,
    readonly camp:ECamp,
    readonly heros:Array<IHeroInfo>,
    readonly robotId?:number,//当 userType = EUserType.robot时有值
}
/**
 * @interface 进战斗战场数据
 */
export interface IBattleInfo {
    readonly battleId:number,
    readonly randomSeed:number,
    readonly gameMode:EGameMode,
    readonly userId:number,
    readonly users:Array<IUserInfo>,
}
// {"battleId":1,"randomSeed":123456,"gameMode":1,"userId":1000,"users":[{"userId":1000,"userType":1,"camp":1,"heros":[{"hId":1,"level":1,"star":1,"quality":1}]},{"userId":1001,"userType":1,"camp":1,"heros":[{"hId":1,"level":1,"star":1,"quality":1}]}]}
/**
 * ""
 */
// export default class BattleInfo {
//     private _battleInfo:IBattleInfo = null;

//     constructor(battleInfo:IBattleInfo)
//     {
//         // JSON.parse(jsonData);
//         this._battleInfo = battleInfo;
//     }
// }