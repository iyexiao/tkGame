
import {EBuffType}  from "./info/BuffInfo"
/**
 * @class ConstValue
 * @author YeXiao
 * @deprecated 常用的静态数据类型
 * @since 2019-3-12 17:15:30
 * 
 */
export default class ConstValue {
    // public static readonly SERVICE_DUMMY = false; //是否是服务器纯跑逻辑
    public static readonly GAME_FRAME_RATE = 30; //游戏每秒逻辑帧数
    public static readonly UN_ATK_BUFF_LIST = [EBuffType.forzen,EBuffType.stun];//不可攻击buff
    public static readonly GAME_TOTAL_FRAM = 7200;//游戏总帧数、4*60*60 单场不超过4分钟，否则太久了
}