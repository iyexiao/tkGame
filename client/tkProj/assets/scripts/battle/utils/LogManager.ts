/**
 * @class LogManager
 * @author YeXiao
 * @deprecated 战斗日志打印系列
 * @since 2019-3-29 10:09:12
 * 
 */
export default class LogManager {
    static _instance:LogManager = null;
    private _logInfo:Array<any> = null;
    static getInstance():LogManager{
        if( LogManager._instance == null ){
            LogManager._instance = new LogManager();
            LogManager._instance._logInfo = [];
        }
        return LogManager._instance;
    }
    /**
     * - 清空所有日志
     */
    clearAllLog(){
        this._logInfo = [];
    }
    log(frame:number,log:string){
        if (!this._logInfo[frame]) {
            this._logInfo[frame] = [];
        }
        this._logInfo[frame].push(log);
        console.log(log);
    }
}