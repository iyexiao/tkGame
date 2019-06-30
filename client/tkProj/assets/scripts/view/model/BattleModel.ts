import BattleCtrl from "../../battle/controller/BattleCtrl";
import { ECamp } from "../../battle/utils/UtilsEnum";
import UserModel from "./UserModel";
import { IBattleInfo } from "../../battle/info/BattleInfo";

/**
 * @class BattleModel
 * @author YeXiao
 * @deprecated 战场相关数据单例，每次进战斗都会根据battleInfo初始化数据，方便读取
 * @since 2019-5-23 23:55:17
 *
 */
export default class BattleModel {
    private bCtrl:BattleCtrl = null; // 战场控制器
    private userCamp:ECamp = null;
    public static getInstance(): BattleModel {
        if ( BattleModel.instance == null ) {
            BattleModel.instance = new BattleModel();
        }
        return BattleModel.instance;
    }
    private static instance: BattleModel = null;
    /**
     * @description 设置战斗控制器
     * @param bCtrl 
     */
    public setBattleCtrl(bCtrl:BattleCtrl) {
        this.bCtrl = bCtrl;
    }
    
    /**
     * - 获取用户阵营
     */
    public getUserCamp(): ECamp{
        if (this.userCamp === null) {
            const userId = UserModel.getInstance().getUserId();
            this.bCtrl.BattleInfo.users.forEach(user => {
                if (user.userId === userId) {
                    this.userCamp = user.camp;
                }
            });
        }
        return this.userCamp;
    }
}