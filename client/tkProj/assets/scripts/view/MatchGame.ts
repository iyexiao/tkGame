import TestManager from "./TestManager";
import { EGameType } from "../battle/utils/UtilsEnum";
import BattleView from "./battle/BattleView";

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
        const onSceneLaunched = function() {
            const canvas = cc.find("Canvas");
            if (!canvas) {
                return;
            }
            // 添加战斗界面控制脚本
            const script:BattleView = canvas.addComponent("BattleView");
            script.loadAndRunBattle(JSON.parse(TestManager.getInstance().getDebugBattleInfo()),EGameType.view);
        }
        cc.director.loadScene("BattleScene",onSceneLaunched);
    }
}
