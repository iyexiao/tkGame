import {HeroInfo} from "../info/HeroInfo";
import {ECamp} from "../utils/UtilsEnum";
import BaseCtrl from "./BaseCtrl";
import BattleCtrl from "./BattleCtrl";

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
    private heroList: {[index: number]: HeroInfo[]} = null;
    constructor(ctrl: BattleCtrl) {
        super(ctrl);
        this.heroList = {};
        this.initHeroInfoList();
    }
    /**
     * @description 初始化阵营数据
     */
    public initHeroInfoList() {
        for (const user of this.BattleCtrl.BattleInfo.users) {
            const camp = user.camp;
            if (!this.heroList[camp]) {
                this.heroList[camp] = new Array<HeroInfo>();
            }
            for (const hero of user.heros) {
                const heroInfo = new HeroInfo(user, hero);
                this.heroList[camp].push(heroInfo);
            }
        }
    }
    /**
     * @description 根据阵营返回对应的角色属性数据
     * @param camp 所属阵营
     */
    public getHeroInfoByCamp(camp: ECamp): HeroInfo[] {
        return this.heroList[camp];
    }
}
