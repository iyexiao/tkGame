import ModelBase from "../model/ModelBase"
import SkillAiBase from "./SkillAiBase"

/**
 * @class SkillAiTest1
 * @author YeXiao
 * @deprecated 英雄战斗技能AI接口
 * @since 2019-3-15 15:58:13
 */
export default class SkillAiTest1 extends SkillAiBase{
    constructor(){
        super("SkillAiTest1");
    }
    onAttackStart(model:ModelBase):void{
        super.onAttackStart(model);
    }
    onHeroDead(model:ModelBase):void{

    }
    onSkillStart(param:any):void{
        if(!super.checkIsSelfModel(param.model)){
            return;
        }
        console.log("阵营：" + this.PlayerModel.getHeroCamp() + " 英雄：" + this.PlayerModel.getHeroName() + " 释放技能");
    }
    onSkillEnd(param:any):void{
        if(!super.checkIsSelfModel(param.model)){
            return;
        }
        console.log("阵营：" + this.PlayerModel.getHeroCamp() + " 英雄：" + this.PlayerModel.getHeroName() + " 释放技能结束");
    }
}