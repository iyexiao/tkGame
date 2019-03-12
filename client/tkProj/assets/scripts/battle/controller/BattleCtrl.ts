import {IBattleInfo} from "../info/BattleInfo"

/**
 * @class BattleCtrl
 * @author YeXiao
 * @deprecated 战斗总控制器
 * @date 2019年3月11日11:53:01
 * 
 */
export default class BattleCtrl {
    private _batleInfo:IBattleInfo = null;
    
    constructor(bInfo:IBattleInfo)
    {
        this._batleInfo = bInfo;
    }
    get BattleInfo()
    {
        return this._batleInfo;
    }
}