import BattleCtrl from "../battle/controller/BattleCtrl";
import TestManager from "./TestManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

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
