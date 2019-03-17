import {IHeroInfo} from "../info/BattleInfo"
import {EPropType} from "../utils/UtilsEnum"
import {BuffInfo}  from "../info/BuffInfo"
import {SkillInfo,ISkillAttr} from "../info/SkillInfo"
import ConstValue from "../ConstValue"
import AiConst from "../ai/AiConst";

/**
 * @interface 英雄战斗属性
 */
export interface IHeroAttr{
    hp:number,          //血量
    phyAtk:number,      //物攻
    phyDef:number,      //物防
    magicAtk:number,    //魔攻
    magicDef:number,    //魔防
    crit:number,        //暴击
    atkSpeed:number,    //攻速
    block:number,       //格挡
}
/**
 * @enum 角色战斗属性值，与IHeroAttr一一对应
 */
export enum EHeroAttr{
    hp = "hp",
    phyAtk = "phyAtk",
    phyDef = "phyDef",
    magicAtk = "magicAtk",
    magicDef = "magicDef",
    crit = "crit",
    atkSpeed = "atkSpeed",
    block = "atkSpeed",
}
/**
 * @class HeroInfo
 * @author YeXiao
 * @deprecated 英雄战斗用的属性数据
 * @since 2019-3-12 17:15:30
 */
export class HeroInfo {
    private readonly _hero:IHeroInfo = null;//战斗基础属性值，用于计算战斗属性值
    private readonly _heroInitAttr:IHeroAttr = null;    //初始属性，是不会改变的
    private _heroAttr:IHeroAttr = null;                 //会随着战斗变化而变化的属性
    private _skillList:Array<SkillInfo> = null;    
    /**
     *  @deprecated 英雄身上buff(index其实是EBuffType类型)
     */
    private _buffList:{[index:number]:Array<BuffInfo>} = null; 
    
    constructor(hInfo:IHeroInfo)
    {
        this._hero = hInfo;
        this._heroInitAttr = this.loadHeroInitAttr(hInfo);
        this._heroAttr = this._heroInitAttr;
        this._buffList = {};
        this._skillList = this.loadHeroSkillList(hInfo);
    }
    /**
     * 
     * @description 根据属性创建英雄自身的战斗属性值
     * @param hero 
     * @returns IHeroAttr
     */
    loadHeroInitAttr(hero:IHeroInfo):IHeroAttr
    {
        let heroAttr:IHeroAttr;
        heroAttr = {hp:100,phyAtk:100,phyDef:100,magicAtk:100,magicDef:100,crit:100,atkSpeed:100,block:10}
        return heroAttr;
    }
    /**
     * @description 根据英雄获取英雄身上技能
     * @param hero 
     * @returns Array<SkillInfo>
     */
    loadHeroSkillList(hero:IHeroInfo):Array<SkillInfo>
    {
        let skillAttr:ISkillAttr;
        let skillAi = new AiConst["SKILL_AI_TEST2"]();
        skillAi.printInfo();
        skillAttr = {skillId:1,skillType:2,skillAtkId:3,skillAi:skillAi}
        let _skillInfo = new SkillInfo(skillAttr);
        let skillArr = new Array<SkillInfo>();
        skillArr.push(_skillInfo);
        return skillArr;
    }
    /**
     * 
     * @param key 改变的值类型
     * @param value 改变的值
     * @param propType 改变类型(值、百分比)
     */
    changePropValue(key:EHeroAttr,value:number,propType:EPropType)
    {
        if(!this._heroAttr[key] || this._heroInitAttr[key])
        {
            return;
        }
        let newValue = null;
        switch(propType){
            case EPropType.addSub:
                newValue = this._heroAttr[key] + value;
                break;
            case EPropType.percentAge:
                newValue = this._heroAttr[key] +  Math.round(this._heroInitAttr[key] * propType / 100);
                break;
        }
        if (newValue <= 0 ) {
            newValue = 0;
        }
        this._heroAttr[key] = newValue;
        switch (key) {
            case EHeroAttr.hp:
                if (newValue == 0) {
                    //角色死亡、做一些死亡的事情
                }
                break;
        
            default:
                break;
        }
    }
    /**
     * @returns 检查是否有不可攻击的buff
     */
    checkHaveUnAttackBuff()
    {
        //检查是否有不可攻击的buff
        for(let key in ConstValue.UN_ATK_BUFF_LIST)
        {
            if(this._buffList[key] && this._buffList[key].length > 0 )
            {
                return true;
            }
        }
        return false;
    }
}