import * as DBHero from "../../resources/config/Hero.json";
/**
 * @interface 英雄属性数据
 */
export interface IDBHero{
    id:number,
    name:string,            //名字
    cardRes:string,
    headRes:string,
    conuntryType:number,
    apt:number,
    atk:number,
    def:number,
    tab:number,
    atkSpeed:number,
    talent:string,
    normalSkill:number,
    smallSkill:Array<number>,
    bigSkill:Array<number>,
    passiveSkill:Array<number>,
    auraSkill:Array<number>,
}
/**
 * @class DBManager
 * @author YeXiao
 * @deprecated 游戏内配表管理单例,主要是配置表对应的结构数据,理论上应该由配表工具自动生成
 * @since 2019-3-19 14:58:28
 * 
 */
export default class DBManager {
    static _instance:DBManager;
    static getInstance():DBManager{
        if( DBManager._instance == null ){
            DBManager._instance = new DBManager();
        }
        return DBManager._instance;
    }
    // _cacheList: {[key: string]: Array<{}>} = null; //用于存储已经加载过的数据

    getDBHeroByNameAndId(id:number):IDBHero{
        return DBHero[id];
    }
}