import ModelBase from "../../model/ModelBase";
import LogsManager from "../../utils/LogsManager";
import SkillAiBase from "../AiBase";

/**
 * @class CCPassiveSkill
 * @author YeXiao
 * @deprecated 典韦被动，每受到一次攻击，增加5%的防御力，持续2回合，最多可叠加5层
 * @param skillArr 第一个参数为增加的buffid
 * @since 2019-5-17 19:04:17
 */
export default class CCPassiveSkill extends SkillAiBase {
    private skillArr: string[] = null;
    constructor(model: ModelBase, skillArr?: string[]) {
        super("CCPassiveSkill", model);
        if (skillArr) {
            this.skillArr = skillArr;
        } else {
            LogsManager.getInstance().error(" 曹操的被动技能未填写参数");
        }
    }
    public onSkillHurt(param: any): void {
        const model: ModelBase = param.model;
        if (!super.checkIsSelfModel(model)) {
            return;
        }
        if (model.checkIsAlive()) {
            model.BuffCom.executeOneBuff(this.skillArr[0]);
        }
    }
}
