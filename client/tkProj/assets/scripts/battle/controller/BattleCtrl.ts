import {IBattleInfo} from "../info/BattleInfo"
import RandomCtrl from "./RandomCtrl"
import GameCtrl from "./GameCtrl"
import LevelCtrl from "./LevelCtrl"
import LogicCtrl from "./LogicCtrl";
import ConstValue from "../ConstValue";
import HandleCtrl from "./HandleCtrl";

/**
 * @class BattleCtrl
 * @author YeXiao
 * @deprecated 战斗总控制器
 * @since 2019-3-12 17:15:08
 * 
 */
export default class BattleCtrl {
    private readonly _batleInfo:IBattleInfo = null;//进战斗数据
    private _randomCtrl:RandomCtrl = null;//随机种子处理
    private _gameCtrl:GameCtrl = null;
    private _levelCtrl:LevelCtrl = null;
    private _logicCtrl:LogicCtrl = null;
    private _handleCtrl:HandleCtrl = null;
    
    constructor(bInfo:IBattleInfo)
    {
        this._batleInfo = bInfo;
    }
    startOneBattle()
    {
        console.log("====>>>>>>>BattleCtrl.startOneBattle");
        this._randomCtrl = new RandomCtrl(this._batleInfo.randomSeed);
        this._levelCtrl = new LevelCtrl(this);
        this._gameCtrl = new GameCtrl(this);
        this._logicCtrl = new LogicCtrl(this);
        this._handleCtrl = new HandleCtrl(this);
        this._gameCtrl.startBattle();
    }
    /**
     * @description 获取进战斗时的数据
     * @returns _batleInfo
     */
    get BattleInfo():IBattleInfo
    {
        return this._batleInfo;
    }
    /**
     * @description 获取关卡控制器
     * @returns _levelCtrl
     */
    get LevelCtrl()
    {
        return this._levelCtrl;
    }
    /**
     * @description 获取游戏控制器
     * @returns _gameCtrl
     */
    get GameCtrl()
    {
        return this._gameCtrl;
    }
    /**
     * @description 获取逻辑控制器
     * @returns _logicCtrl
     */
    get LogicCtrl()
    {
        return this._logicCtrl;
    }
    /**
     * @description 获取随机种子控制器
     * @returns _randomCtrl
     */
    get RandomCtrl()
    {
        return this._randomCtrl;
    }
    /**
     * @description 获取出手控制器
     * @returns _handleCtrl
     */
    get HandleCtrl(){
        return this._handleCtrl;
    }
}