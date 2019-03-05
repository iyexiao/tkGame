
/**
 * @class fw
 * @author YeXiao
 * @deprecated farmework命名空间
 * @date 2019-2-28 23:38:18
 * 
 */
declare module fw {
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