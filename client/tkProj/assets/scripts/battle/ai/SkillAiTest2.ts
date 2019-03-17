import ModelBase from "../model/ModelBase"
import SkillAiBase from "./SkillAiBase"

/**
 * @class SkillAiTest2
 * @author YeXiao
 * @deprecated 英雄战斗技能AI接口
 * @since 2019-3-15 15:58:13
 */
export default class SkillAiTest2 extends SkillAiBase{
    constructor(){
        super("SkillAiTest2");
    }
    onHeroAttackStart(model:ModelBase):void{

    }
    onHeroDead(model:ModelBase):void{

    }
}