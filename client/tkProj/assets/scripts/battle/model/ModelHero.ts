import GameCtrl from "../controller/GameCtrl";
import {HeroInfo} from "../info/HeroInfo";
import LogsManager from "../utils/LogsManager";
import {ESkillType} from "../utils/UtilsEnum";
import ModelBase from "./ModelBase";

/**
 * @class ModelHero
 * @author YeXiao
 * @deprecated 战场上卡牌对象，负责攻击相关处理
 * @since 2019-3-12 17:15:30
 *
 */
export default class ModelHero extends ModelBase {
    constructor(controler: GameCtrl, heroInfo: HeroInfo) {
        super(controler, heroInfo);
        LogsManager.getInstance().log("初始化 " + heroInfo.HeroDB.name + " 的数据 " + "[camp:" + heroInfo.HeroAttr.camp
                + " hp:" + heroInfo.HeroAttr.hp + " atk:" + heroInfo.HeroAttr.phyAtk + " def:" + heroInfo.HeroAttr.phyDef
                + " speed:" + heroInfo.HeroAttr.atkSpeed + " crit" + heroInfo.HeroAttr.crit + " pos:" + heroInfo.HeroAttr.posIdx + "]");
        // heroInfo.printLogInfo();
    }
    /**
     * 初始化英雄的光环技能
     */
    public initAura() {
        const skillInfo = this.HeroInfo.SkillList[ESkillType.aura];
        if (skillInfo) {
            const logStr = "=====>>>>阵营: " + this.getHeroCamp() + " 的光环技能：" + skillInfo.SkillDB.id + " 生效！";
            LogsManager.getInstance().log(logStr);
        }
    }
}
