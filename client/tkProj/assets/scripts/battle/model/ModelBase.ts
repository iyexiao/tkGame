import GameCtrl from "../controller/GameCtrl"
import {IHeroInfo} from "../info/BattleInfo"

/**
 * @class ModelBase
 * @author YeXiao
 * @deprecated model基类
 * @since 2019-3-12 17:15:30
 * 
 */
export default class ModelBase {
    private _ctrl:GameCtrl = null;
    private _hero:IHeroInfo = null;
    constructor(controler:GameCtrl,hero:IHeroInfo)
    {
        this._ctrl = controler;
        this._hero = hero;
    }
}