import BattleCtrl from './BattleCtrl'
import BaseCtrl from './BaseCtrl';
import ModelBase from '../model/ModelBase';
/**
 * @class LogicCtrl
 * @extends BaseCtrl
 * @author YeXiao
 * @deprecated 游戏逻辑控制器
 * @since 2019-3-12 17:15:20
 * 
 */
export default class LogicCtrl extends BaseCtrl {

    constructor(ctrl:BattleCtrl)
    {
        super(ctrl);
    }
    //做角色上去攻击
    doAttackByHeroList(arr:Array<ModelBase>){
        if (arr.length <= 0) {
            return;
        }
        //按顺序攻击
        for (let index = 0; index < arr.length; index++) {
            const model = arr[index];
            let skillInfo = model.getPlaySkillInfo();
            if (skillInfo) {
                model.prepareGiveOutOneSkill(skillInfo);
            }
        }
    }
}