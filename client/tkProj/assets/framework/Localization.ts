/**
 * @class Localization
 * @author YeXiao
 * @deprecated 本地化
 * @date 2019-3-5 22:35:12
 *
 */
export default class Localization {
    public static getInstance(): Localization {
        if (Localization.instance == null) {
            Localization.instance = new Localization();
        }
        return Localization.instance;
    }
    private static instance: Localization = null;
    private jsonData: any[] = null;
    constructor() {
        this.jsonData = [];
    }
    public loadText() {
        // 初始化多语言文件
    }
    public getText(keyStr: string) {
        return this.jsonData[keyStr];
    }
}
