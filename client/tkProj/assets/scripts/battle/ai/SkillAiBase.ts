import ModelBase from "../model/ModelBase"
/**
 * @class ISkillAi
 * @author YeXiao
 * @deprecated 英雄战斗技能AI接口
 * @since 2019-3-15 15:58:13
 */
export default abstract class SkillAi{
    constructor(){}
    abstract onHeroAttackStart(model:ModelBase)             //当一个英雄开始攻击时
    abstract onHeroDead(model:ModelBase)                    //当一个英雄死亡时
}