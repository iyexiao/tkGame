import ModelBase from "../model/ModelBase"
import SkillAiBase from "./SkillAiBase"

/**
 * @class SkillAiTest2
 * @author YeXiao
 * @deprecated 英雄战斗技能AI接口
 * @since 2019-3-15 15:58:13
 */
export default class SkillAiTest2 extends SkillAiBase{
    // private _playerModel:ModelBase = null;
    constructor(){
        super("SkillAiTest2");
    }
    // /**
    //  * - 设置技能的释放者
    //  * @param model 设置技能释放者
    //  */
    // setPlayerModel(model:ModelBase):void{
    //     this._playerModel = model;
    // }
    onAttackStart(model:ModelBase):void{
        super.onAttackStart(model);
    }
    onHeroDead(model:ModelBase):void{

    }
}