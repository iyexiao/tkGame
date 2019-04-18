import { SkillInfo } from "../../info/SkillInfo";
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
    private currSkill: SkillInfo = null; // 英雄当前释放的技能
    private lastChooseModelList: ModelBase[] = null;   // 上次技能选中的敌人
    constructor(model: ModelBase) {
        super(model);
        // 绑定技能对象数据
        model.HeroInfo.SkillList.forEach((element) => {
            element.getSkillAi().setPlayerModel(model);
        });
    }
    get CurrSkill() {
        return this.currSkill;
    }
    get LastChooseModelList() {
        return this.lastChooseModelList;
    }
    /**
     * - 重置技能，技能被打断了也需要重置
     */
    public resetCurrentSkill() {
        // 重置技能攻击包
        this.currSkill.resetAtkInfo();
        this.currSkill = null;
        this.lastChooseModelList = null;
    }
    /**
     * - 设置技能释放数据
     * @param defList
     * @param skillInfo
     */
    public setSkillData(defList: ModelBase[], skillInfo: SkillInfo) {
        // 设置选中的敌人
        this.lastChooseModelList = defList;
        // 设置释放的技能
        this.currSkill = skillInfo;
        // 设置技能释放者
        this.currSkill.updateSkillAttr(this.Model);
    }
}
