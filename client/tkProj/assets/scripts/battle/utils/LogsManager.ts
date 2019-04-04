import BattleCtrl from "../controller/BattleCtrl";
import ModelBase from "../model/ModelBase";
import { EBattleTrigger } from "./UtilsEnum";

/**
 * @class LogsManager
 * @author YeXiao
 * @deprecated 战斗日志打印系列
 * @since 2019-3-29 10:09:12
 * 
 */
export default class LogsManager {
    static _instance:LogsManager = null;
    private _logInfo:Array<any> = null;
    private _battleCtrl:BattleCtrl = null;
    static getInstance():LogsManager{
        if( LogsManager._instance == null ){
            LogsManager._instance = new LogsManager();
            LogsManager._instance._logInfo = [];
        }
        return LogsManager._instance;
    }
    setBattleCtrl(battleCtrl:BattleCtrl){
        this._battleCtrl = battleCtrl;
    }
    /**
     * - 清空所有日志
     */
    clearAllLog(){
        this._logInfo = [];
        this._battleCtrl = null;
    }
    /**
     * - 战斗日志打印
     * @param log 需要存储或者打印的log
     */
    log(log:string){
        if (!this._battleCtrl || !this._battleCtrl.GameCtrl) {
            console.log("还未初始化battleCtrl")
            return;
        }
        let frame = this._battleCtrl.GameCtrl.CurrentFrame;
        if (!this._logInfo[frame]) {
            this._logInfo[frame] = [];
        }
        this._logInfo[frame].push(log);
        console.log("frame:" + frame + " " + log);
    }
    skilllog(trigger:EBattleTrigger,model:ModelBase){
        let logStr = '';
        switch (trigger) {
            case EBattleTrigger.onSkillStart:
                //获取技能释放对象
                let tmpStr = "  对";
                for (let index = 0; index < model.LastChooseModelList.length; index++) {
                    const element = model.LastChooseModelList[index];
                    tmpStr  = tmpStr + " 阵营:" + element.getHeroCamp() + " 的 " + element.getHeroPosIndex()+ " 号位英雄：" + element.getHeroName();
                }
                logStr = "阵营：" + model.getHeroCamp() +" 的" + model.getHeroPosIndex()+ " 号位英雄：" + 
                            model.getHeroName() + tmpStr + " 释放技能:" + model.CurrSkill.getSkillAi().SkillName;
                break;
            case EBattleTrigger.onSkillEnd:
                logStr = "阵营：" + model.getHeroCamp() +" 的" + model.getHeroPosIndex()+ " 号位英雄：" + 
                            model.getHeroName() + " 技能:" + model.CurrSkill.getSkillAi().SkillName + "释放结束";
                break;
            default:
                break;
        }
        this.log(logStr);
    }
}