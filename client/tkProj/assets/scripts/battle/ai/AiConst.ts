import CCAuraSkill from "./caocao/CCAuraSkill";
import CCBigSkill from "./caocao/CCBigSkill";
import CCNormalSkill from "./caocao/CCNormalSkill";
import CCPassivSkille from "./caocao/CCPassiveSkill";
import CCSmallSkill from "./caocao/CCSmallSkill";

/**
 * @class AiConst
 * @author YeXiao
 * @deprecated Ai技能扩展类，用于记录需要的技能脚本。理论上这个文件是自动生成的，当导表工具生成的时候，自动生成这里面的方法
 * @since 2019-3-17 11:57:12
 */
export default class AiConst {
    // 曹操技能
    public static readonly CCNormalSkill = CCNormalSkill;
    public static readonly CCSmallSkill = CCSmallSkill;
    public static readonly CCAuraSkill = CCAuraSkill;
    public static readonly CCBigSkill = CCBigSkill;
    public static readonly CCPassivSkille = CCPassivSkille;
}
