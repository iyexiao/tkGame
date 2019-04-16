import { DBBuffs } from "../../db/DBBuffs";
import {DBHero, IDBHero} from "../../db/DBHero";
import { DBSkill , IDBSkill} from "../../db/DBSkill";
import ConstValue from "../ConstValue";
import {IHeroInfo, IUserInfo} from "../info/BattleInfo";
import {BuffInfo, IBuffAttr} from "../info/BuffInfo";
import {SkillInfo} from "../info/SkillInfo";
import ModelBase from "../model/ModelBase";
import {EBuffType, ECamp, EPropType} from "../utils/UtilsEnum";

/**
 * @interface 英雄战斗属性
 */
export interface IHeroAttr {
    hp: number;          // 血量
    phyAtk: number;      // 物攻
    phyDef: number;      // 物防
    magicAtk: number;    // 魔攻
    magicDef: number;    // 魔防
    crit: number;        // 暴击
    atkSpeed: number;    // 攻速
    block: number;       // 闪避
    camp: ECamp;         // 阵营
    posIdx: number;      // 当前站位
}
/**
 * @enum 角色战斗属性值，在IHeroAttr中必须有值
 */
export enum EHeroAttr {
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
    get HeroDB() {
        return this.heroDB;
    }
    get HeroInfo() {
        return this.hero;
    }
    get CurrAtkFrame() {
        return this.currAtkFrame;
    }
    get HeroAttr(): IHeroAttr {
        return this.heroAttr;
    }
    get SkillList(): SkillInfo[] {
        return this.skillList;
    }
    private readonly user: IUserInfo;       // 角色信息
    private readonly hero: IHeroInfo = null; // 战斗基础属性值，用于计算战斗属性值
    private readonly heroInitAttr: IHeroAttr = null;    // 初始属性，是不会改变的
    private readonly heroDB: IDBHero = null;            // 英雄配表数据
    private heroAttr: IHeroAttr = null;                 // 会随着战斗变化而变化的属性
    private currAtkFrame: number = null;                // 当前攻速
    private skillList: SkillInfo[] = null;         // 英雄身上的技能信息
    private buffList: {[index: number]: BuffInfo[]} = null; // 英雄身上buff(index其实是EBuffType类型)
    /**
     * - 创建一个英雄模型数据
     * @param user
     * @param hInfo
     */
    constructor(user: IUserInfo, hInfo: IHeroInfo) {
        this.hero = hInfo;
        this.user = user;
        this.heroDB = DBHero.getInstance().getDBHeroById(hInfo.hId as null);
        this.heroInitAttr = this.loadHeroInitAttr(user, hInfo);
        this.heroAttr = this.heroInitAttr;
        this.buffList = {};
        this.skillList = this.loadHeroSkillList(hInfo);
        this.setCurrAtkFrame(this.getAttackCDFrame());
    }
    /**
     * - 设置英雄当前攻速
     * @param atkFrame 不传代表重新取值
     */
    public setCurrAtkFrame(atkFrame: number) {
        this.currAtkFrame = atkFrame;
    }
    /**
     * 获取攻击间隔
     */
    public getAttackCDFrame(): number {
        return this.heroAttr.atkSpeed;
    }
    /**
     * - 获取角色技能攻击力
     */
    public getHeroAtk(): number {
        return (this.heroAttr.phyAtk + this.heroAttr.magicAtk * 2 );
    }
    /**
     * @description 返回符合类型的buff数组
     * @param buffType EBuffType类型
     */
    public getBuffListByEBuffType(buffType: EBuffType): BuffInfo[] {
        if (this.buffList[buffType]) {
            return this.buffList[buffType];
        }
        return null;
    }
    /**
     * - 添加一个buff
     * @param buffId
     */
    public executeOneBuff(buffId: string, model: ModelBase): boolean {
        // test
        const buffDB = DBBuffs.getInstance().getDBBuffsById(buffId);
        const buffList = this.getBuffListByEBuffType(buffDB.buffType);
        let canAdd = false;
        // buff替换
        if (buffDB.step === 1) {
            if (buffList) {
                this.buffList[buffDB.buffType].splice(0,buffList.length);
            } else {
                this.buffList[buffDB.buffType] = [];
            }
            canAdd = true;
        } else {
            if (!buffList ) {
                canAdd = true;
                this.buffList[buffDB.buffType] = [];
            } else if (buffList.length < buffDB.step) {
                canAdd = true;
            }
        }
        if (canAdd) {
            const buffAttr: IBuffAttr = {buffId, buffType: buffDB.buffType, buffValue: 0, creaseType: buffDB.creaseType, currRound: buffDB.round};
            // test
            buffAttr.buffValue = 0;
            const buffInfo = new BuffInfo(buffAttr, model);
            this.buffList[buffDB.buffType].push(buffInfo);
        }
        return false;
    }
    /**
     *
     * @description 根据属性创建英雄自身的战斗属性值
     * @param hero
     * @returns IHeroAttr
     */
    public loadHeroInitAttr(user: IUserInfo, hero: IHeroInfo): IHeroAttr {
        // test
        let heroAttr: IHeroAttr;
        heroAttr = {hp: 100, phyAtk: 100, phyDef: 100, magicAtk: 100, magicDef: 100, crit: 100, atkSpeed: 100, block: 10, camp: user.camp, posIdx: hero.posIdx};
        heroAttr.hp = this.getHp(hero);
        heroAttr.phyAtk = this.getAtk(hero);
        heroAttr.magicAtk = heroAttr.phyAtk;
        heroAttr.phyDef = this.getDef(hero);
        heroAttr.atkSpeed = this.getAtkSpeed( hero);
        return heroAttr;
    }
    /**
     * @description 根据英雄获取英雄身上技能
     * @param hero
     * @returns Array<SkillInfo>
     */
    public loadHeroSkillList(hero: IHeroInfo): SkillInfo[] {
        // test 需要根据登记组装所有的技能及参数
        const skillArr = [ ]; // 技能根据普攻、小技能、大招、被动、光环顺序存储
        // 普攻
        const skillInfo = this.getOneSkillById(String(this.heroDB.normalSkill));
        skillArr[skillInfo.SkillDB.skillType] = skillInfo;
        // 小技能 [等级、品阶、星级、技能id]
        let tmpArr = this.heroDB.smallSkill;
        if (this.checkSkillIsOpen(hero, tmpArr)) {
            const skillInfo = this.getOneSkillById(tmpArr[3]);
            skillArr[skillInfo.SkillDB.skillType] = skillInfo;
        }
        // 大招
        tmpArr = this.heroDB.bigSkill;
        if (this.checkSkillIsOpen(hero, tmpArr)) {
            const skillInfo = this.getOneSkillById(tmpArr[3]);
            skillArr[skillInfo.SkillDB.skillType] = skillInfo;
        }
        // 被动
        tmpArr = this.heroDB.passiveSkill;
        if (this.checkSkillIsOpen(hero, tmpArr)) {
            const skillInfo = this.getOneSkillById(tmpArr[3]);
            skillArr[skillInfo.SkillDB.skillType] = skillInfo;
        }
        // 光环
        tmpArr = this.heroDB.auraSkill;
        if (this.checkSkillIsOpen(hero, tmpArr)) {
            const skillInfo = this.getOneSkillById(tmpArr[3]);
            skillArr[skillInfo.SkillDB.skillType] = skillInfo;
        }
        return skillArr;
    }
    /**
     *
     * @param key 改变的值类型
     * @param value 改变的值
     * @param propType 改变类型(值、百分比)
     */
    public changePropValue(key: EHeroAttr, value: number, propType: EPropType, model: ModelBase) {
        if (!this.heroAttr[key] || !this.heroInitAttr[key]) {
            return;
        }
        let newValue = null;
        switch (propType) {
            case EPropType.addSub:
                newValue = this.heroAttr[key] + value;
                break;
            case EPropType.percentAge:
                newValue = this.heroAttr[key] +  Math.round(this.heroInitAttr[key] * value / 100);
                break;
        }
        if (newValue <= 0 ) {
            newValue = 0;
        }
        this.heroAttr[key] = newValue;
        switch (key) {
            case EHeroAttr.hp:
                if (newValue === 0) {
                    // 角色死亡、做一些死亡的事情
                    model.onHeroDead();
                }
                break;
            default:
                break;
        }
    }
    /**
     * @returns 检查是否有不可攻击的buff
     */
    public checkHaveUnAttackBuff() {
        // 检查是否有不可攻击的buff
        for (const key in ConstValue.UN_ATK_BUFF_LIST) {
            if (this.buffList[key] && this.buffList[key].length > 0 ) {
                return true;
            }
        }
        return false;
    }
    /**
     * - 检查技能是否解锁
     * @param hero 英雄属性
     * @param skillArr 技能参数列表
     */
    private checkSkillIsOpen(hero: IHeroInfo, skillArr: string[]): boolean {
        if ( skillArr.length !== 4 ) {
            return false;
        }
        const lv = Number(skillArr[0]);
        const qty = Number(skillArr[1]);
        const star = Number(skillArr[2]);
        if (hero.level >= lv && hero.quality >= qty && hero.level >= star) {
            return true;
        }
        return false;
    }
    /**
     * - 获取某个技能
     * @param skillId
     */
    private getOneSkillById(skillId: string): SkillInfo {
        const skillDB: IDBSkill = DBSkill.getInstance().getDBSkillById(skillId);
        const skillInfo = new SkillInfo(skillDB);
        return skillInfo;
    }
    /**
     * - 攻速：agility + apt * (level + star * 2 + quality * 3)
     * @param heroInfo
     */
    private getAtkSpeed( heroInfo: IHeroInfo): number {
        let speed = this.heroDB.agility + (heroInfo.level + heroInfo.star * 2 + heroInfo.quality * 3 ) * this.heroDB.apt;
        speed = ConstValue.ATK_MAX_SPEED - speed > 0 ? ConstValue.ATK_MAX_SPEED - speed : 0;
        return (speed + ConstValue.SKILL_MAX_FRAME );
    }
    /**
     * - 血量：apt * ((strength + quality ) * 3 + (intelligence + star) * 2 + agility + level)
     * @param heroInfo
     */
    private getHp( heroInfo: IHeroInfo): number {
        const hp = this.heroDB.apt * ((this.heroDB.strength + heroInfo.quality) * 3 + (this.heroDB.intelligence + heroInfo.star) * 2 + this.heroDB.agility + heroInfo.level );
        return hp;
    }
    /**
     * - 攻击力：apt * (quality * 3 + (intelligence + strength + star) * 2 + level)
     * @param heroInfo
     */
    private getAtk( heroInfo: IHeroInfo): number {
        const atk = this.heroDB.apt * (heroInfo.quality * 3 + (this.heroDB.intelligence + this.heroDB.strength + heroInfo.star) * 2 + heroInfo.level);
        return atk;
    }
    /**
     * - 防御力：apt * (quality * 3 + (intelligence + strength + star) * 2 + level) + agility
     * @param heroInfo
     */
    private getDef( heroInfo: IHeroInfo): number {
        const def = this.heroDB.apt * (heroInfo.quality * 3 + (this.heroDB.intelligence + this.heroDB.strength + heroInfo.star) * 2 + heroInfo.level) + this.heroDB.agility;
        return def;
    }
}
