
/**
 * @class fw
 * @author YeXiao
 * @deprecated farmework解释
 * @since 2019-3-12 17:15:30
 * 
 */
declare module fw {
    export function log(msg:string);
    export function bLog(msg:string);
    export module ViewManager{
        export function pushView(name:string,prefab:cc.Prefab,data:any);
        export function popView(deptt?:number);
    }
    
    //声明本地化相关方法
    export module Localization {
        export function loadText();
        export function getText(keyStr: string);
    }
}