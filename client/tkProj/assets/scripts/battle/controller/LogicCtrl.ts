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
    doAttackByHeroList(arr:Array<ModelBase>){
        if (arr.length <= 0) {
            return;
        }
        //按顺序攻击
        for (let index = 0; index < arr.length; index++) {
            const model = arr[index];
            if(model.CurrSkill){
                console.log("技能未释放完毕？什么鬼！出bug了");
            }
            //TODO :判定角色是否能够攻击,释放攻击技能并记录攻击包对应的伤害帧，
            // 如果有前摇，需要记录下来，要是被打断，需要取消这个技能释放伤害
            let skillInfo = model.getPlaySkillInfo();
            if (skillInfo) {
                //设置释放的技能
                model.CurrSkill = skillInfo;
            }
        }
    }
}