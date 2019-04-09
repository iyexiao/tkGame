import BattleCtrl from "./BattleCtrl";
/**
 * @class BaseCtrl
 * @author YeXiao
 * @deprecated 游戏控制器基类
 * @since 2019-3-12 17:15:00
 *
 */
export default class BaseCtrl {
    private readonly battleCtrl: BattleCtrl = null;
    constructor(ctrl: BattleCtrl) {
        this.battleCtrl = ctrl;
    }

    get BattleCtrl() {
        return this.battleCtrl;
    }
}
