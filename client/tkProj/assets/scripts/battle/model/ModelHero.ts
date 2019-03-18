import GameCtrl from "../controller/GameCtrl"
import {HeroInfo} from "../info/HeroInfo"
import ModelBase from "./ModelBase"
import {SkillInfo} from "../info/SkillInfo"
import {ESkillType, ECamp} from "../utils/UtilsEnum"

/**
 * @class ModelHero
 * @author YeXiao
 * @deprecated 战场上卡牌对象，负责攻击相关处理
 * @since 2019-3-12 17:15:30
 * 
 */
export default class ModelHero extends ModelBase {
    constructor(controler:GameCtrl,heroInfo:HeroInfo)
    {
        super(controler,heroInfo);
        // heroInfo.printLogInfo();
    }
    /**
     * 初始化英雄的光环技能
     */
    initAura(){
        for (let index = 0; index < this.HeroInfo.SkillList.length; index++) {
            const skillInfo:SkillInfo = this.HeroInfo.SkillList[index];
            if (skillInfo.SkillInfo.skillType == ESkillType.aura) {
                console.log("=====>>>>阵营: " + this.getHeroCamp() +" 的光环技能：" + skillInfo.SkillInfo.skillId + " 生效！");
            }
        }
    }
    /**
     * @description 获取英雄对应阵营
     * @returns ECamp
     */
    getHeroCamp():ECamp{
        return this.HeroInfo.HeroAttr.camp;
    }
}