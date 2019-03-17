import ModelBase from "../model/ModelBase"
/**
 * @class SkillAiBase
 * @author YeXiao
 * @deprecated 英雄战斗技能AI接口
 * @since 2019-3-15 15:58:13
 */
export default abstract class SkillAiBase{
    private _skillName:string = null;
    constructor(nameStr:string){
        this._skillName = nameStr;
    }
    printInfo(){
        console.log("name----:",this._skillName);
    }
    abstract onHeroAttackStart(model:ModelBase):void;             //当一个英雄开始攻击时
    abstract onHeroDead(model:ModelBase):void;                    //当一个英雄死亡时
}