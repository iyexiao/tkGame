import BattleCtrl from "../battle/controller/BattleCtrl";

let battleInfo = '                                              \
{                                                               \
    "battleId": 1,                                              \
    "randomSeed": 123456,                                       \
    "gameMode": 1,                                              \
    "userId": 1000,                                             \
    "users": [                                                  \
      {                                                         \
        "userId": 1000,                                         \
        "userName": "test1",                                    \
        "userType": 1,                                          \
        "camp": 0,                                              \
        "heros": [                                              \
            {                                                   \
              "hId": 1,                                         \
              "level": 1,                                       \
              "star": 1,                                        \
              "quality": 1,                                     \
              "posIdx": 0                                       \
            },                                                  \
            {                                                   \
              "hId": 1,                                         \
              "level": 3,                                       \
              "star": 1,                                        \
              "quality": 1,                                     \
              "posIdx": 1                                       \
            },                                                  \
            {                                                   \
              "hId": 1,                                         \
              "level": 5,                                       \
              "star": 2,                                        \
              "quality": 2,                                     \
              "posIdx": 2                                       \
            },                                                  \
            {                                                   \
              "hId": 1,                                         \
              "level": 6,                                       \
              "star": 3,                                        \
              "quality": 3,                                     \
              "posIdx": 4                                       \
            }                                                   \
        ]                                                       \
      },                                                        \
      {                                                         \
        "userId": 1001,                                         \
        "userName": "test2",                                    \
        "userType": 1,                                          \
        "camp": 1,                                              \
        "heros": [                                              \
            {                                                   \
              "hId": 1,                                         \
              "level": 1,                                       \
              "star": 1,                                        \
              "quality": 1,                                     \
              "posIdx": 3                                       \
            },                                                  \
            {                                                   \
              "hId": 1,                                         \
              "level": 3,                                       \
              "star": 1,                                        \
              "quality": 1,                                     \
              "posIdx": 6                                       \
            },                                                  \
            {                                                   \
              "hId": 1,                                         \
              "level": 5,                                       \
              "star": 2,                                        \
              "quality": 2,                                     \
              "posIdx": 7                                       \
            },                                                  \
            {                                                   \
              "hId": 1,                                         \
              "level": 6,                                       \
              "star": 3,                                        \
              "quality": 3,                                     \
              "posIdx": 8                                       \
            }                                                   \
        ]                                                       \
      }                                                         \
    ]                                                           \
  }                                                             \
';
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
        let bCtrl = new BattleCtrl(JSON.parse(battleInfo));
        bCtrl.startOneBattle();
    }
}
