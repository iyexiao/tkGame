import BattleInfo from "../info/BattleInfo"

/**
 * @class BattleCtrl
 * @author YeXiao
 * @deprecated 战斗总控制器
 * @date 2019年3月11日11:53:01
 * 
 */
export default class BattleCtrl {
    private _batleInfo:BattleInfo = null;
    
    constructor(bInfo:BattleInfo)
    {
        this._batleInfo = BattleInfo;
    }
}