import GameCtrl from "../controller/GameCtrl"
import {HeroInfo} from "../info/HeroInfo"
import { ECamp, EBattleTrigger } from "../utils/UtilsEnum";
import { SkillInfo } from "../info/SkillInfo";
import EventManager from "../../../framework/event/EventManager";

/**
 * @class ModelBase
 * @author YeXiao
 * @deprecated model基类
 * @since 2019-3-12 17:15:30
 * 
 */
export default class ModelBase {
    private _ctrl:GameCtrl = null;
    private _heroInfo:HeroInfo = null;
    private _currSkill:SkillInfo = null; //英雄当前释放的技能
    constructor(controler:GameCtrl,heroInfo:HeroInfo)
    {
        this._ctrl = controler;
        this._heroInfo = heroInfo;
    }
    get CurrSkill(){
        return this._currSkill;
    }
    get HeroInfo()
    {
        return this._heroInfo;
    }
    /**
     * @description 更新英雄出手帧数、前摇帧数等
     */
    updateHeroFrame(){
        let tmpFrame = this._heroInfo.CurrAtkFrame <= 0 ? 0 : this._heroInfo.CurrAtkFrame - 1;
        this._heroInfo.setCurrAtkFrame(tmpFrame);
        if (this._currSkill){
            if(this._currSkill.SkillInfo.beforeFrame && this._currSkill.SkillInfo.beforeFrame > 0) {
                this._currSkill.SkillInfo.beforeFrame -= 1;
            }
            if(this._currSkill.SkillInfo.totalFrame && this._currSkill.SkillInfo.totalFrame > 0)
            {
                this._currSkill.SkillInfo.totalFrame -= 1 ;
                if (this._currSkill.SkillInfo.totalFrame == 0){
                    this.giveOutOneSkillEnd();
                }
            }
        }
    }
    /**
     * - 获取英雄当前攻速
     */
    getHeroAtkFrame():number{
        return this._heroInfo.CurrAtkFrame;
    }
    /**
     * - 获取英雄名字
     */
    getHeroName():string{
        return this.HeroInfo.HeroDB.name;
    }
    /**
     * @description 获取英雄当前对应阵营
     * @returns ECamp
     */
    getHeroCamp():ECamp{
        return this.HeroInfo.HeroAttr.camp;
    }
    /**
     * 获取可以释放的技能(返回空说明没有可释放的技能)
     * @returns SkillInfo 将要播放的技能
     */
    getPlaySkillInfo():SkillInfo{
        //test
        return this.HeroInfo.SkillList[0];
    }
    /**
     * - 技能释放结束
     */
    giveOutOneSkillEnd(){
        //重置技能
        this._currSkill = null;
        EventManager.getInstance().dispatchEvent(EBattleTrigger.onSkillEnd,{model:this});
    }
    /**
     * - 释放某一技能
     */
    giveOutOneSkill(skillInfo:SkillInfo){
        if (!skillInfo) {
            return;
        }
        //设置释放的技能
        this._currSkill = skillInfo;
        this._currSkill.getSkillAi().setPlayerModel(this);
        EventManager.getInstance().dispatchEvent(EBattleTrigger.onSkillStart,{model:this});
        //如果技能没有释放时间、则直接技能释放结束
        if (!this._currSkill.SkillInfo.totalFrame) {
            this.giveOutOneSkillEnd();
        }
    }
}