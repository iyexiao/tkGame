/**
 * @class Localization
 * @author YeXiao
 * @deprecated 本地化
 * @date 2019-3-5 22:35:12
 * 
 */
export default class Localization {
    static _instance: Localization = null;
    static getInstance(): Localization {
        if (Localization._instance == null) {
            Localization._instance = new Localization();
        }
        return Localization._instance;
    }
    jsonData:Object = null;
    constructor(){
        this.jsonData = {};
    }
    loadText(){
        //初始化多语言文件
    }
    getText(keyStr:string)
    {
        return this.jsonData[keyStr];
    }
}
