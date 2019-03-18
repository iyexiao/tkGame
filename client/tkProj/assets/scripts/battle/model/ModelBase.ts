import GameCtrl from "../controller/GameCtrl"
import {HeroInfo} from "../info/HeroInfo"
import { ECamp } from "../utils/UtilsEnum";
import { SkillInfo } from "../info/SkillInfo";

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
    get CurrSkill(){
        return this._currSkill;
    }
    set CurrSkill(skillInfo:SkillInfo){
        this._currSkill = skillInfo;
    }
    constructor(controler:GameCtrl,heroInfo:HeroInfo)
    {
        this._ctrl = controler;
        this._heroInfo = heroInfo;
    }
    get HeroInfo()
    {
        return this._heroInfo;
    }
    /**
     * 获取英雄当前攻速
     */
    getHeroAtkFrame():number{
        return this._heroInfo.CurrAtkFrame;
    }
    /**
     * @description 更新英雄出手帧数、前摇帧数等
     */
    updateHeroFrame(){
        this._heroInfo.CurrAtkFrame = this._heroInfo.CurrAtkFrame <= 0 ? 0 : this._heroInfo.CurrAtkFrame - 1;
        if (this._currSkill && this._currSkill.SkillInfo.beforeFrame && this._currSkill.SkillInfo.beforeFrame > 0) {
            this._currSkill.SkillInfo.beforeFrame = this._heroInfo.CurrAtkFrame - 1;
        }
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
}