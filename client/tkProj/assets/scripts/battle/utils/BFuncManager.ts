import { IHeroInfo } from "../info/BattleInfo";

/**
 * @class BattleFuncManager
 * @author YeXiao
 * @deprecated 战斗方法基础管理管理单例
 * @since 2019-3-12 17:15:30
 *
 */
export default class BFuncManager {
    public static getInstance(): BFuncManager {
        if ( BFuncManager.instance == null ) {
            BFuncManager.instance = new BFuncManager();
        }
        return BFuncManager.instance;
    }
    private static instance: BFuncManager;
}
