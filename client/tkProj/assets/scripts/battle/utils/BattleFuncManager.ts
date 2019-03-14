/**
 * @class BattleFuncManager
 * @author YeXiao
 * @deprecated 战斗方法基础管理管理单例
 * @since 2019-3-12 17:15:30
 * 
 */
export default class BattleFuncManager {
    static _instance:BattleFuncManager = null;
    static getInstance():BattleFuncManager{
        if( BattleFuncManager._instance == null ){
            BattleFuncManager._instance = new BattleFuncManager();
        }
        return BattleFuncManager._instance;
    }
    
}