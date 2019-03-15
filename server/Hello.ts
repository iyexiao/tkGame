
console.log("servcer=====start");

let battleInfo = '{"battleId":1,"randomSeed":123456,"gameMode":1,"userId":1000,"users":[{"userId":1000,"userType":1,"camp":0,"heros":[{"hId":1,"level":1,"star":1,"quality":1}]},{"userId":1001,"userType":1,"camp":1,"heros":[{"hId":1,"level":1,"star":1,"quality":1}]}]}';


import BattleCtrl from "../client/tkProj/assets/scripts/battle/controller/BattleCtrl"
let bCtrl = new BattleCtrl(JSON.parse(battleInfo));
bCtrl.startOneBattle();