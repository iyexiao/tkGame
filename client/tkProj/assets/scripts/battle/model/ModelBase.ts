import GameCtrl from "../controller/GameCtrl"
import {HeroInfo} from "../info/HeroInfo"

/**
 * @class ModelBase
 * @author YeXiao
 * @deprecated model基类
 * @since 2019-3-12 17:15:30
 * 
 */
export default class ModelBase {
    private _ctrl:GameCtrl = null;
    private _heroInfo:HeroInfo = null;
    constructor(controler:GameCtrl,heroInfo:HeroInfo)
    {
        this._ctrl = controler;
        this._heroInfo = heroInfo;
    }
    get HeroInfo()
    {
        return this._heroInfo;
    }
}