import {IBattleInfo} from "../info/BattleInfo"
import BattleRandom from "../utils/BattleRandom"
import GameCtrl from "./GameCtrl"

/**
 * @class BattleCtrl
 * @author YeXiao
 * @deprecated 战斗总控制器
 * @since 2019-3-12 17:15:08
 * 
 */
export default class BattleCtrl {
    private _batleInfo:IBattleInfo = null;//进战斗数据
    private _battleRandom:BattleRandom = null;//随机种子处理
    private _controller:GameCtrl = null;
    
    constructor(bInfo:IBattleInfo)
    {
        this._batleInfo = bInfo;
    }
    startOneBattle()
    {
        this._battleRandom = new BattleRandom(this._batleInfo.randomSeed);
        this._controller = new GameCtrl();
    }

    get BattleInfo()
    {
        return this._batleInfo;
    }
}