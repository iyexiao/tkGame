import { DBAttack, IDBAttack } from "../../db/DBAttack";

/**
 * @interface 攻击包的属性信息
 */
export interface IAttackAttr {
    damage: number;             // 伤害值
    isFirst: boolean;           // 是否是第一个攻击包
}

/**
 * @class AttackInfo
 * @author YeXiao
 * @deprecated 技能对应的攻击包相关
 * @since 2019-3-12 17:15:30
 *
 */
export class AttackInfo {
    private atkAttr: IAttackAttr = null;
    private atkDB: IDBAttack = null;

    constructor(atkId: number, dmg: number) {
        this.atkDB = DBAttack.getInstance().getDBAttackById(String(atkId));
        this.atkAttr = {damage: dmg, isFirst: true};
    }
    /**
     * - 检查是否是第一次命中
     */
    public checkIsFirst(): boolean {
        if (this.atkAttr.isFirst) {
            return true;
        }
        return false;
    }
    public getDamage(): number {
        return this.atkAttr.damage;
    }
    public getPropType(): number {
        return this.atkDB.propType;
    }
    /**
     * - 更新攻击包是否是第一次触发
     */
    public updateIsFirst() {
        this.atkAttr.isFirst = false;
    }
}
