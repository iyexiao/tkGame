
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
}