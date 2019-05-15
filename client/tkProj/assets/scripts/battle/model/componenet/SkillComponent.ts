import { DBSkill, IDBSkill } from "../../../db/DBSkill";
import { SkillInfo } from "../../info/SkillInfo";
import LogsManager from "../../utils/LogsManager";
import ModelBase from "../ModelBase";
import BaseComponent from "./BaseComponent";

/**
 * @class SkillComponent
 * @author YeXiao
 * @deprecated 角色模型中的技能组件，负责对技能释放、组装
 * @since 2019-4-16 18:11:50
 *
 */
export default class SkillComponent extends BaseComponent {
    private currSkill: SkillInfo = null; // 英雄当前释放的技能
    private lastChooseModelList: ModelBase[] = null;   // 上次技能选中的敌人
    private readonly skillList: SkillInfo[] = null;   // 角色技能信息
    constructor(model: ModelBase) {
        super(model);
        this.skillList = [];
        // 初始化角色技能信息
        model.HeroInfo.SkillIds.forEach((skillId) => {
            const skillDB: IDBSkill = DBSkill.getInstance().getDBSkillById(skillId);
            const skillInfo = new SkillInfo(skillDB, model);
            this.skillList.push(skillInfo);
        });
    }
    get CurrSkill() {
        return this.currSkill;
    }
    get LastChooseModelList() {
        return this.lastChooseModelList;
    }
    /**
     * - 更新技能方法用于更新技能CD (现在好像没啥用)
     */
    public update() {
        for (const iterator of this.skillList) {
            iterator.updateSkillCD();
        }
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
     * - 选择一个技能，准备释放
     */
    public checkToGiveOutOneSkill(): SkillInfo {
        // test选择一个可释放的技能
        for (const iterator of this.skillList) {
            if (iterator.SkillCD === 0) {
                return iterator;
            }
        }
        return this.skillList[0];
    }
    /**
     * - 选择一个可释放的技能，然后设置技能释放信息，
     * @returns 是否能够释放
     */
    public checkAndPrepareGiveOutOneSkill(): boolean {
        const skillInfo = this.checkToGiveOutOneSkill();
        const defList = skillInfo.getChooseModelList();
        if (defList.length === 0) {
            LogsManager.getInstance().log("无可选中的敌人");
            return false;
        }
        skillInfo.loadSkillAttr();
        // 设置选中的敌人
        this.lastChooseModelList = defList;
        // 设置释放的技能
        this.currSkill = skillInfo;
        return true;
    }
    /**
     * - 检查当前节能是否有前摇
     */
    public checkCurrentHaveBeforeFrame(): boolean {
        if (this.currSkill.SkillDB.beforeFrame === 0) {
            return false;
        }
        return false;
    }
}
