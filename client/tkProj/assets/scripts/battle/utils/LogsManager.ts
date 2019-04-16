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
     * - 报错日志
     * @param log
     */
    public error(log: string) {
// tslint:disable-next-line: no-console
        console.log("error:" + log);
    }
    /**
     * - 普通日志打印
     * @param log
     */
    public echo(log: string) {
// tslint:disable-next-line: no-console
        console.log("echo:" + log);
    }
    /**
     * - 战斗日志打印
     * @param log 需要存储或者打印的log
     */
    public log(log: string) {
        let frame = 0;
        if (this.battleCtrl && this.battleCtrl.GameCtrl) {
            frame = this.battleCtrl.GameCtrl.CurrentFrame;
        }
        if (!this.logInfo[frame]) {
            this.logInfo[frame] = [];
        }
        this.logInfo[frame].push(log);
// tslint:disable-next-line: no-console
        console.log("frame:" + frame + " " + log);
    }
    public skilllog(trigger: EBattleTrigger, model: ModelBase) {
        let logStr = "";
        let tmpStr = "";
        switch (trigger) {
            case EBattleTrigger.onSkillStart:
                // 获取技能释放对象
                tmpStr = "  attack[";
                for (const element of model.LastChooseModelList) {
                    tmpStr  = tmpStr + "camp:" + element.getHeroCamp() + " pos:" + element.getHeroPosIndex() + " hero:" + element.getHeroName() + ",";
                }
                tmpStr = tmpStr + "]";
                logStr = "camp:" + model.getHeroCamp() + " pos:" + model.getHeroPosIndex() + " hero:"
                            + model.getHeroName() + tmpStr + " skill:" + model.CurrSkill.getSkillAi().SkillName;
                break;
            case EBattleTrigger.onSkillEnd:
                logStr = "camp:" + model.getHeroCamp() + " pos:" + model.getHeroPosIndex() + " hero:"
                           + model.getHeroName() + " skill:[" + model.CurrSkill.getSkillAi().SkillName + " ] end";
                break;
            case EBattleTrigger.onGiveOutAtk:
                tmpStr = "[";
                for (const element of model.LastChooseModelList) {
                    tmpStr  = tmpStr + "camp:" + element.getHeroCamp() + " pos:" + element.getHeroPosIndex() + " hero:" + element.getHeroName() + ",";
                }
                tmpStr = tmpStr + "]";
                logStr =  tmpStr + " from camp:" + model.getHeroCamp() + " pos:" + model.getHeroPosIndex() + " hero:" + model.getHeroName()
                    + "  attack:[dmg:" + model.CurrSkill.CurrrAtkInfo.getDamage() + " protype:" + model.CurrSkill.CurrrAtkInfo.getPropType()
                    + "]";
                break;
            case EBattleTrigger.onDead:
                logStr = "camp:" + model.getHeroCamp() + " pos:" + model.getHeroPosIndex() + " hero:" + model.getHeroName() + " dead.";
                break;
            default:
                break;
        }
        this.log(logStr);
    }
}
