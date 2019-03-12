import GameCtrl from "../controller/GameCtrl"
import {HeroInfo} from "../info/HeroInfo"
import ModelBase from "./ModelBase"

/**
 * @class ModelHero
 * @author YeXiao
 * @deprecated 战场上卡牌对象，负责攻击相关处理
 * @since 2019-3-12 17:15:30
 * 
 */
export default class ModelHero extends ModelBase {
    constructor(controler:GameCtrl,heroInfo:HeroInfo)
    {
        super(controler,heroInfo)
    }
}