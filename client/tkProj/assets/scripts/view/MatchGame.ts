import BattleCtrl from "../battle/controller/BattleCtrl";
import TestManager from "./TestManager";

const {ccclass, property} = cc._decorator;

/**
 * @class MatchGame
 * @author YeXiao
 * @deprecated 匹配成功进入战斗的逻辑脚本
 * @since 2019-5-23 23:55:17
 *
 */
@ccclass
export default class MatchGame extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
    public matchGameClick() {
        let bCtrl = new BattleCtrl(JSON.parse(TestManager.getInstance().getDebugBattleInfo()));
        bCtrl.startOneBattle();
    }
}
