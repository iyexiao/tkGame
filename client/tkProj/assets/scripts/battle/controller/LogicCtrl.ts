import BattleCtrl from './BattleCtrl'
import BaseCtrl from './BaseCtrl';
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
}