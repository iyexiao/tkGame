/**
 * @class InstanceBase
 * @author YeXiao
 * @deprecated 单例基类
 * @date 2019-2-28 23:38:18
 * 
 */
export default class InstanceBase {
    static _instance: InstanceBase = null;
    static getInstance(): InstanceBase {
        if (InstanceBase._instance == null) {
            InstanceBase._instance = new InstanceBase();
        }
        return InstanceBase._instance;
    }
    constructor(){
        
    }
}
