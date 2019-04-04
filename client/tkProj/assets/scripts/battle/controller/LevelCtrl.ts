import {HeroInfo} from "../info/HeroInfo"
import {ECamp} from "../utils/UtilsEnum"
import BattleCtrl from './BattleCtrl'
import BaseCtrl from "./BaseCtrl";

/**
 * @class LevelCtrl
 * @extends BaseCtrl
 * @author YeXiao
 * @deprecated 游戏关卡控制器；此处用于初始化战场内level对应的角色数据
 * @since 2019-3-12 17:13:53
 * 
 */
export default class LevelCtrl extends BaseCtrl {
    /**
     * @description 阵营对应的角色数据
     */
    private _heroList:{[index:number]:Array<HeroInfo>} = null;
    constructor(ctrl:BattleCtrl)
    {
        super(ctrl);
        this._heroList = {};
        this.initHeroInfoList();
    }
    /**
     * @description 初始化阵营数据
     */
    initHeroInfoList()
    {
        let _battleInfo = this.BattleCtrl.BattleInfo;
        for (let index = 0; index < _battleInfo.users.length; index++) {
            const user = _battleInfo.users[index];
            let camp = user.camp
            if (!this._heroList[camp]) {
                this._heroList[camp] = new Array<HeroInfo>();
            }
            for (let j = 0; j < user.heros.length; j++) {
                const hero = user.heros[j];
                let heroInfo = new HeroInfo(user,hero);
                this._heroList[camp].push(heroInfo);
            }
        }
    }
    /**
     * @description 根据阵营返回对应的角色属性数据
     * @param camp 所属阵营
     */
    getHeroInfoByCamp(camp:ECamp):Array<HeroInfo>
    {
        return this._heroList[camp];
    }
}