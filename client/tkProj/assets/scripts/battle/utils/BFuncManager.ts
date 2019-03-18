import ConstValue from '../ConstValue'
/**
 * @class BattleFuncManager
 * @author YeXiao
 * @deprecated 战斗方法基础管理管理单例
 * @since 2019-3-12 17:15:30
 * 
 */
export default class BFuncManager {
    static _instance:BFuncManager;
    static getInstance():BFuncManager{
        if( BFuncManager._instance == null ){
            BFuncManager._instance = new BFuncManager();
        }
        return BFuncManager._instance;
    }
}