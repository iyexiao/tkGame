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
    public static getInstance(): LogsManager {
        if ( LogsManager.instance == null ) {
            LogsManager.instance = new LogsManager();
            LogsManager.instance.logInfo = [];
        }
        return LogsManager.instance;
    }
    private static instance: LogsManager = null;
    private logInfo: any[] = null;
    private battleCtrl: BattleCtrl = null;
    public setBattleCtrl(battleCtrl: BattleCtrl) {
        this.battleCtrl = battleCtrl;
    }
    /**
     * - 清空所有日志
     */
    public clearAllLog() {
        this.logInfo = [];
        this.battleCtrl = null;
    }
    /**
     * - 战斗日志打印
     * @param log 需要存储或者打印的log
     */
    public log(log: string) {
        if (!this.battleCtrl || !this.battleCtrl.GameCtrl) {
// tslint:disable-next-line: no-console
            console.log("还未初始化battleCtrl");
            return;
        }
        const frame = this.battleCtrl.GameCtrl.CurrentFrame;
        if (!this.logInfo[frame]) {
            this.logInfo[frame] = [];
        }
        this.logInfo[frame].push(log);
// tslint:disable-next-line: no-console
        console.log("frame:" + frame + " " + log);
    }
    public skilllog(trigger: EBattleTrigger, model: ModelBase) {
        let logStr = "";
        switch (trigger) {
            case EBattleTrigger.onSkillStart:
                // 获取技能释放对象
                let tmpStr = "  对";
                for (const element of model.LastChooseModelList) {
                    tmpStr  = tmpStr + " 阵营:" + element.getHeroCamp() + " 的 " + element.getHeroPosIndex() + " 号位英雄：" + element.getHeroName();
                }
                logStr = "阵营：" + model.getHeroCamp() + " 的" + model.getHeroPosIndex() + " 号位英雄："
                            + model.getHeroName() + tmpStr + " 释放技能:" + model.CurrSkill.getSkillAi().SkillName;
                break;
            case EBattleTrigger.onSkillEnd:
                logStr = "阵营：" + model.getHeroCamp() + " 的" + model.getHeroPosIndex() + " 号位英雄："
                           + model.getHeroName() + " 技能:" + model.CurrSkill.getSkillAi().SkillName + "释放结束";
                break;
            default:
                break;
        }
        this.log(logStr);
    }
}
