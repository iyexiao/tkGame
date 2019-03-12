import GameCtrl from "../controller/GameCtrl"
import {IHeroInfo} from "../info/BattleInfo"

/**
 * @class ModelBase
 * @author YeXiao
 * @deprecated model基类
 * @date 2019年3月11日11:53:01
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