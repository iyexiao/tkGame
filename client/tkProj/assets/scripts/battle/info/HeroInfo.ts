import {IHeroInfo, IUserInfo} from "../info/BattleInfo"
import {EPropType,ECamp, ESkillType} from "../utils/UtilsEnum"
import {BuffInfo, EBuffType}  from "../info/BuffInfo"
import {SkillInfo} from "../info/SkillInfo"
import ConstValue from "../ConstValue"
import {DBHero,IDBHero} from "../../db/DBHero"
import { IDBSkill ,DBSkill} from "../../db/DBSkill";

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
    camp:ECamp,         //阵营
    posIdx:number,      //当前站位
}
/**
 * @enum 角色战斗属性值，在IHeroAttr中必须有值
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
    private readonly _user:IUserInfo;       //角色信息
    private readonly _hero:IHeroInfo = null;//战斗基础属性值，用于计算战斗属性值
    private readonly _heroInitAttr:IHeroAttr = null;    //初始属性，是不会改变的
    private readonly _heroDB:IDBHero = null;            //英雄配表数据
    private _heroAttr:IHeroAttr = null;                 //会随着战斗变化而变化的属性
    private _currAtkFrame:number = null;                //当前攻速
    private _skillList:Array<SkillInfo> = null;         //英雄身上的技能信息
    private _buffList:{[index:number]:Array<BuffInfo>} = null;//英雄身上buff(index其实是EBuffType类型)
    /**
     * - 创建一个英雄模型数据
     * @param user 
     * @param hInfo 
     */
    constructor(user:IUserInfo,hInfo:IHeroInfo)
    {
        this._hero = hInfo;
        this._user = user;
        this._heroInitAttr = this.loadHeroInitAttr(user,hInfo);
        this._heroAttr = this._heroInitAttr;
        this._buffList = {};
        this._heroDB = DBHero.getInstance().getDBHeroById(<null>hInfo.hId);
        this._skillList = this.loadHeroSkillList(hInfo);
        this.setCurrAtkFrame(this.getAttackCDFrame());
    }
    get HeroDB(){
        return this._heroDB;
    }
    get HeroInfo(){
        return this._hero;
    }
    get CurrAtkFrame(){
        return this._currAtkFrame;
    }
    get HeroAttr():IHeroAttr{
        return this._heroAttr;
    }   
    get SkillList():Array<SkillInfo>{
        return this._skillList;
    }
    /**
     * - 设置英雄当前攻速
     * @param atkFrame 不传代表重新取值
     */
    setCurrAtkFrame(atkFrame:number){
        this._currAtkFrame = atkFrame;
    }
    /**
     * 获取攻击间隔
     */
    getAttackCDFrame():number{
        return this._heroDB.atkSpeed;
    }
    /**
     * @description 返回符合类型的buff数组
     * @param buffType EBuffType类型
     */
    getBuffListByEBuffType(buffType:EBuffType):Array<BuffInfo>
    {
        if (this._buffList[buffType]) {
            return this._buffList[buffType];
        }
        return null;
    }
    /**
     * 
     * @description 根据属性创建英雄自身的战斗属性值
     * @param hero 
     * @returns IHeroAttr
     */
    loadHeroInitAttr(user:IUserInfo,hero:IHeroInfo):IHeroAttr
    {
        //test
        let heroAttr:IHeroAttr;
        heroAttr = {hp:100,phyAtk:100,phyDef:100,magicAtk:100,magicDef:100,crit:100,atkSpeed:100,block:10,camp:user.camp,posIdx:hero.posIdx};
        return heroAttr;
    }
    /**
     * @description 根据英雄获取英雄身上技能
     * @param hero 
     * @returns Array<SkillInfo>
     */
    loadHeroSkillList(hero:IHeroInfo):Array<SkillInfo>
    {
        //test 需要根据登记组装所有的技能及参数
        let _skillDB:IDBSkill = DBSkill.getInstance().getDBSkillById(<string><null>this._heroDB.normalSkill);
        let skillInfo = new SkillInfo(_skillDB);
        let skillArr = [,,,];//技能根据普攻、小技能、大招、被动、光环顺序存储
        skillArr[skillInfo.SkillDB.skillType] = skillInfo;
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