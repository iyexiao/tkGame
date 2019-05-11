import ModelBase from "../model/ModelBase";
import BaseCtrl from "./BaseCtrl";
import BattleCtrl from "./BattleCtrl";
/**
 * @class LogicCtrl
 * @extends BaseCtrl
 * @author YeXiao
 * @deprecated 游戏逻辑控制器、战斗逻辑
 * @since 2019-3-12 17:15:20
 *
 */
export default class LogicCtrl extends BaseCtrl {

    constructor(ctrl: BattleCtrl) {
        super(ctrl);
    }
    // 做角色上去攻击
    public doAttackByHeroList(arr: ModelBase[]) {
        if (arr.length <= 0) {
            return;
        }
        // 按顺序攻击
        for (const model of arr) {
            model.checkToPlaySkill();
        }
    }
    /**
     * - 当一个英雄死亡时触发
     * @param model 死亡的角色
     */
    public onOneModelDead(model: ModelBase) {
        // 从出手顺序中移除它，并把它放入死亡列表(有可能复活)，
        this.BattleCtrl.HandleCtrl.delModelHandle(model);
        this.BattleCtrl.GameCtrl.removeOneModelToDeadArr(model);
    }
}
