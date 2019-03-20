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
    onSkillStart(param:any):void{
        if(!super.checkIsSelfModel(param.model)){
            return;
        }
        console.log("在第：" + this.PlayerModel.getGameCurrFrame() + "帧,阵营：" + this.PlayerModel.getHeroCamp() + " 英雄：" + 
                    this.PlayerModel.getHeroName() + " 释放技能:" + this.SkillName + " 攻击阵营：" + param.model.getHeroCamp() + " 的：" + param.model.getHeroName());
    }
    onSkillEnd(param:any):void{
        if(!super.checkIsSelfModel(param.model)){
            return;
        }
        console.log("在第：" + this.PlayerModel.getGameCurrFrame() + "帧,阵营：" + this.PlayerModel.getHeroCamp() + " 英雄：" + this.PlayerModel.getHeroName() + " 释放技能结束");
    }
}