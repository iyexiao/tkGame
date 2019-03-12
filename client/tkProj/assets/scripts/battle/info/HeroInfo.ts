import {IHeroInfo} from "../info/BattleInfo"

/**
 * @interface 英雄战斗属性
 */
interface IHeroAttr{

}

/**
 * @class HeroInfo
 * @author YeXiao
 * @deprecated 英雄战斗用的属性数据
 * @since 2019-3-12 17:15:30
 * 
 */
export class HeroInfo {
    private _hero:IHeroInfo = null;
    private _heroAttr:IHeroAttr = null;

    constructor()
    {
    }
}