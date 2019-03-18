/**
 * @interface 攻击包的属性信息
 */
export interface IAttackAttr{
    damage:number,              //伤害值
    buffList:Array<number>,     //产生的buff
}

/**
 * @class AttackInfo
 * @author YeXiao
 * @deprecated 技能对应的攻击包相关
 * @since 2019-3-12 17:15:30
 * 
 */
export class AttackInfo {
    private _atkId:number = null;

    constructor(atkId:number)
    {
        this._atkId = atkId;
    }
}