
export default class LogManager {
    public static getInstance(): LogManager {
        if (LogManager.instance == null) {
            LogManager.instance = new LogManager();
        }
        return LogManager.instance;
    }
    private static instance: LogManager = null;

    private isLog: boolean = true;

    public log() {
        if (!this.isLog) {
            return;
        }
// tslint:disable-next-line: no-string-literal no-console
        const backLog = cc.log || console.log ||  window["log"];
        backLog.call(LogManager, "%s%s" + cc.js.formatStr.apply(cc, arguments), this._getDateString(), this._stack());
    }

    public info() {
        if (!this.isLog) {
            return;
        }
// tslint:disable-next-line: no-string-literal no-console
        const backLog = cc.log || console.log || window["log"];
        backLog.call(LogManager, "%c%s%s:" + cc.js.formatStr.apply(cc, arguments), "color:#00CD00;", this._getDateString(), this._stack());
    }

    public log2() {
        if (!this.isLog) {
            return;
        }
// tslint:disable-next-line: no-string-literal no-console
        const backLog = cc.log || console.log || window["log"];
        backLog.call(LogManager, "%c%s%s:" + cc.js.formatStr.apply(cc, arguments), "color:#EED2EE;", this._getDateString(), this._stack());
    }

    public info2() {
        if (!this.isLog) {
            return;
        }
// tslint:disable-next-line: no-string-literal no-console
        const backLog = cc.log || console.log || window["log"];
        backLog.call(LogManager, "%c%s%s:" + cc.js.formatStr.apply(cc, arguments),  "color:#F08080;", this._getDateString(), this._stack());
    }

    public info3() {
        if (!this.isLog) {
            return;
        }
// tslint:disable-next-line: no-string-literal no-console
        const backLog = cc.log || console.log || window["log"];
        backLog.call(LogManager, "%c%s%s:" + cc.js.formatStr.apply(cc, arguments), "color:#9B30FF;", this._getDateString(), this._stack());
    }

    public warn() {
        if (!this.isLog) {
            return;
        }
// tslint:disable-next-line: no-string-literal no-console
        const backLog = cc.log || console.log || window["log"];
        backLog.call(LogManager, "%c%s%s:" + cc.js.formatStr.apply(cc, arguments), "color:#ee7700;", this._getDateString(), this._stack());
    }

    public error() {
        if (!this.isLog) {
            return;
        }
// tslint:disable-next-line: no-string-literal no-console
        const backLog = cc.log || console.log || window["log"];
        backLog.call(LogManager, "%c%s%s:" + cc.js.formatStr.apply(cc, arguments), "color:red", this._getDateString(), this._stack());
    }
    private _stack() {
        const e = new Error();
        const lines = e.stack.split("\n");
        lines.shift();
        const result = [];
        lines.forEach((line) => {
            line = line.substring(7);
            const lineBreak = line.split(" ");
            if (lineBreak.length < 2) {
                result.push(lineBreak[0]);
            } else {
                result.push({[lineBreak[0]]: lineBreak[1]});
            }
        });

// tslint:disable-next-line: variable-name
        let result_idx = -1;
        for (let i = 0; i < result.length; i++) {
// tslint:disable-next-line: forin
            for (const a in result[i]) {
                const l = a.split(".");
                if (l[0] !== "GameLog") {
                    result_idx = i;
                    break;
                }
            }
            if (result_idx >= 0) {
                break;
            }
        }

// tslint:disable-next-line: variable-name no-string-literal
        const result_list  = Object["values"](result[2])[0].split("/");

        return result_list[result_list.length - 1];
    }

    private _getDateString(): string {
        const d = new Date();
        let str = d.getHours() + "";
        let timeStr = "";
        timeStr += (str.length === 1 ? ("0" + str) : str) + ":";

        str = d.getMinutes() + "";
        timeStr += (str.length === 1 ? ("0" + str) : str) + ":";

        str = d.getSeconds() + "";
        timeStr += (str.length === 1 ? ("0" + str) : str) + ".";

        str = d.getMilliseconds() + "";
        if (str.length === 1) { str = "00" + str; }
        if (str.length === 2) { str = "0" + str; }
        timeStr += str;

        timeStr = "[" + timeStr + "]";

        return timeStr;
    }
}
