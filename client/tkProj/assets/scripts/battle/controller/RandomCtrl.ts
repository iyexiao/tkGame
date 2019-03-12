import RandomBase from "../../../framework/utils/RandomBase"

/**
 * @class RandomCtrl
 * @author YeXiao
 * @deprecated 战斗随机种子控制器，继承RandomBase
 * @extends RandomBase
 * @since 2019-3-12 17:15:30
 * 
 */

export default class RandomCtrl extends RandomBase{
    
    constructor(seed:number)
    {
        super(seed);
    }
}