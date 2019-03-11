import GameCtrl from "../controller/GameCtrl"
import HeroInfo from "../info/HeroInfo"

/**
 * @class ModelBase
 * @author YeXiao
 * @deprecated model基类
 * @date 2019年3月11日11:53:01
 * 
 */
export default class ModelBase {
    private _ctrl:GameCtrl = null;
    private _hero:HeroInfo = null;
    constructor(controler:GameCtrl,hero:HeroInfo)
    {
        this._ctrl = controler;
        this._hero = hero;
    }
}