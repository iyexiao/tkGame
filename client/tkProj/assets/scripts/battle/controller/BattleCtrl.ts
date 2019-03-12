import {IBattleInfo} from "../info/BattleInfo"
import RandomCtrl from "./RandomCtrl"
import GameCtrl from "./GameCtrl"
import LevelCtrl from "./LevelCtrl"

/**
 * @class BattleCtrl
 * @author YeXiao
 * @deprecated 战斗总控制器
 * @since 2019-3-12 17:15:08
 * 
 */
export default class BattleCtrl {
    private _batleInfo:IBattleInfo = null;//进战斗数据
    private _randomCtrl:RandomCtrl = null;//随机种子处理
    private _gameCtrl:GameCtrl = null;
    private _levelCtrl:LevelCtrl = null;
    
    constructor(bInfo:IBattleInfo)
    {
        this._batleInfo = bInfo;
    }
    startOneBattle()
    {
        this._randomCtrl = new RandomCtrl(this._batleInfo.randomSeed);
        this._gameCtrl = new GameCtrl();
        this._levelCtrl = new LevelCtrl(this._batleInfo);
    }

    get BattleInfo()
    {
        return this._batleInfo;
    }
}