
import {EBuffType} from "./info/BuffInfo";
/**
 * @class ConstValue
 * @author YeXiao
 * @deprecated 常用的静态数据类型
 * @since 2019-3-12 17:15:30
 *
 */
export default class ConstValue {
    // public static readonly SERVICE_DUMMY = false; //是否是服务器纯跑逻辑
    public static readonly GAME_FRAME_RATE = 30; // 游戏每秒逻辑帧数
    public static readonly UN_ATK_BUFF_LIST = [EBuffType.forzen, EBuffType.stun]; // 不可攻击buff
    public static readonly GAME_TOTAL_FRAME = 100; // 7200;//游戏总帧数、4*60*60 单场不超过4分钟，否则太久了
    public static readonly SKILL_MAX_FRAME = 60; // 最大技能帧
    public static readonly ATK_MAX_SPEED = 500; // 最大攻速
    // 阵营坐标系
    //  8 7 6
    //  5 4 3
    //  2 1 0
    // -------
    //  0 1 2
    //  3 4 5
    //  6 7 8
    public static readonly GAME_ROW_LIST = [[0, 1, 2], [3, 4, 5], [6, 7, 8]]; // 行对应的坐标
    public static readonly GAME_COL_LIST = [[0, 3, 6], [1, 4, 7], [2, 5, 8]]; // 列对应的坐标
}
