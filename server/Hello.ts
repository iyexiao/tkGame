
console.log("servcer=====start");

import BattleCtrl from "../client/tkProj/assets/scripts/battle/controller/BattleCtrl";
import TestManager from "../client/tkProj/assets/scripts/view/TestManager";

let bCtrl = new BattleCtrl(JSON.parse(TestManager.getInstance().getDebugBattleInfo()));
bCtrl.startOneBattle();