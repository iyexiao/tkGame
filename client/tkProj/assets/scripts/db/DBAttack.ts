// auto build by python scriptexport interface IDBAttack {     id: number ;     propType: number ;     dmg: number ;}const tmpDb: {[index: string ]: IDBAttack } = {   1: {id: 1, propType: 0, dmg: 10},   2: {id: 2, propType: 1, dmg: 11},   3: {id: 3, propType: 0, dmg: 12},   4: {id: 4, propType: 0, dmg: 13},   5: {id: 5, propType: 0, dmg: 14},   6: {id: 6, propType: 0, dmg: 15},   7: {id: 7, propType: 0, dmg: 16},   8: {id: 8, propType: 0, dmg: 17},   9: {id: 9, propType: 0, dmg: 18},};export class DBAttack {    public static getInstance(): DBAttack {        if ( DBAttack.instance == null ) {            DBAttack.instance = new DBAttack();        }        return DBAttack.instance;    }    private static instance: DBAttack;    private readonly db: {[index: string]: IDBAttack} = null;    constructor() {        this.db = tmpDb;    }    public getDBAttackById(id: string): IDBAttack {        return this.db[id];    }    public getAllDBAttack() {        return this.db;    }}
