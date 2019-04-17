import ModelBase from "../ModelBase";
import BaseComponent from "./BaseComponent";

/**
 * @class SkillComponent
 * @author YeXiao
 * @deprecated 角色模型中的技能组件
 * @since 2019-4-16 18:11:50
 *
 */
export default class SkillComponent extends BaseComponent {
    constructor(model: ModelBase) {
        super(model);
        // 绑定技能对象数据
        model.HeroInfo.SkillList.forEach((element) => {
            element.getSkillAi().setPlayerModel(model);
        });
    }
}
