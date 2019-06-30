import { EBuffType } from "./utils/UtilsEnum";

/**
 * @class ConstValue
 * @author YeXiao
 * @deprecated 常用的静态数据类型
 * @since 2019-3-12 17:15:30
 *
 */
export default class ConstValue {
    // public static readonly SERVICE_DUMMY = false; //是否是服务器纯跑逻辑
    public static readonly GAME_FRAME_RATE = 1/50; // 游戏每秒逻辑帧数
    public static readonly UN_ATK_BUFF_LIST = [EBuffType.forzen, EBuffType.stun]; // 不可攻击buff
    public static readonly GAME_TOTAL_FRAME = 7200; // 7200;//游戏总帧数、4*60*60 单场不超过4分钟，否则太久了
    public static readonly SKILL_MAX_FRAME = 60; // 最大技能帧
    public static readonly ATK_MAX_SPEED = 500; // 最大攻速
    public static readonly HERO_MAX_STAR = 5;   // 英雄最大星级
    // 阵营坐标系
    //  5 4 3
    //  2 1 0
    // -------
    //  0 1 2
    //  3 4 5
    public static readonly GAME_ROW_LIST = [[0, 1, 2], [3, 4, 5]]; // 行对应的坐标
    public static readonly GAME_COL_LIST = [[0, 3], [1, 4], [2, 5]]; // 列对应的坐标

    // 游戏内真实坐标位置
    // 视图阵营1
    // --------
    // 视图阵营0
    public static readonly GAME_POS_1 = [[-180,120], [0,120], [180,120], [-180,310], [0,310], [180,310]];
    public static readonly GAME_POS_0 = [[-180,-120], [0,-120], [180,-120], [-180,-310], [0,-310], [180,-310]];
}
