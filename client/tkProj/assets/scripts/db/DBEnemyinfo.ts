// auto build by python scriptexport interface IDBEnemyinfo {     id: number ;     name: string ;     cardRes: string ;     headRes: string ;     conuntryType: number ;     apt: number ;     atk: number ;     def: number ;     soldier: number ;     cost: number ;     star: number ;     quality: number ;     tab: number ;     power: number ;     anger: number ;     atkSpeed: number ;     skill0: number ;     skill1: number ;     skill2: number ;}const tmpDb: {[index: string ]: IDBEnemyinfo } = {   1: {id: 1, name: "曹操", cardRes: "heroBody_1001", headRes: "heroHead_1001", conuntryType: 1, apt: 10, atk: 101, def: 47, soldier: 1001, cost: 270, star: 3, quality: 1, tab: 3, power: 1, anger: 1, atkSpeed: 50, skill0: 1, skill1: 0, skill2: 2},   2: {id: 2, name: "典韦", cardRes: "heroBody_1002", headRes: "heroHead_1002", conuntryType: 1, apt: 10, atk: 87, def: 54, soldier: 1123, cost: 275, star: 3, quality: 1, tab: 5, power: 1, anger: 1, atkSpeed: 50, skill0: 3, skill1: 4, skill2: 0},   3: {id: 3, name: "夏侯渊", cardRes: "heroBody_1003", headRes: "heroHead_1003", conuntryType: 1, apt: 12, atk: 170, def: 64, soldier: 1407, cost: 373, star: 3, quality: 1, tab: 2, power: 1, anger: 2, atkSpeed: 40, skill0: 5, skill1: 6, skill2: 0},   4: {id: 4, name: "许诸", cardRes: "heroBody_1004", headRes: "heroHead_1004", conuntryType: 1, apt: 10, atk: 70, def: 58, soldier: 1353, cost: 284, star: 3, quality: 1, tab: 1, power: 1, anger: 3, atkSpeed: 45, skill0: 7, skill1: 0, skill2: 8},   5: {id: 5, name: "曹仁", cardRes: "heroBody_1005", headRes: "heroHead_1005", conuntryType: 1, apt: 7, atk: 53, def: 31, soldier: 590, cost: 158, star: 2, quality: 1, tab: 5, power: 1, anger: 1, atkSpeed: 50, skill0: 9, skill1: 10, skill2: 0},   6: {id: 6, name: "蔡文姬", cardRes: "heroBody_1006", headRes: "heroHead_1006", conuntryType: 1, apt: 6, atk: 71, def: 24, soldier: 429, cost: 195, star: 1, quality: 1, tab: 3, power: 1, anger: 2, atkSpeed: 50, skill0: 1, skill1: 0, skill2: 2},   7: {id: 7, name: "于禁", cardRes: "heroBody_1007", headRes: "heroHead_1007", conuntryType: 1, apt: 6, atk: 49, def: 23, soldier: 429, cost: 119, star: 1, quality: 1, tab: 3, power: 1, anger: 3, atkSpeed: 50, skill0: 3, skill1: 4, skill2: 0},   8: {id: 8, name: "曹植", cardRes: "heroBody_1008", headRes: "heroHead_1008", conuntryType: 1, apt: 7, atk: 66, def: 19, soldier: 475, cost: 201, star: 1, quality: 1, tab: 4, power: 1, anger: 2, atkSpeed: 50, skill0: 5, skill1: 6, skill2: 0},   9: {id: 9, name: "乐进", cardRes: "heroBody_1009", headRes: "heroHead_1009", conuntryType: 1, apt: 7, atk: 51, def: 31, soldier: 635, cost: 161, star: 2, quality: 1, tab: 5, power: 1, anger: 4, atkSpeed: 50, skill0: 7, skill1: 0, skill2: 8},   10: {id: 10, name: "曹洪", cardRes: "heroBody_1010", headRes: "heroHead_1010", conuntryType: 1, apt: 6, atk: 135, def: 77, soldier: 1553, cost: 393, star: 1, quality: 1, tab: 2, power: 1, anger: 3, atkSpeed: 50, skill0: 9, skill1: 10, skill2: 0},};export class DBEnemyinfo {    public static getInstance(): DBEnemyinfo {        if ( DBEnemyinfo.instance == null ) {            DBEnemyinfo.instance = new DBEnemyinfo();        }        return DBEnemyinfo.instance;    }    private static instance: DBEnemyinfo;    private readonly db: {[index: string]: IDBEnemyinfo} = null;    constructor() {        this.db = tmpDb;    }    public getDBEnemyinfoById(id: string): IDBEnemyinfo {        return this.db[id];    }    public getAllDBEnemyinfo() {        return this.db;    }}
