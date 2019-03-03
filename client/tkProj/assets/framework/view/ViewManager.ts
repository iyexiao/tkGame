export default class ViewManager {
    static _instance: ViewManager = null;
    static getInstance(): ViewManager {
        if (ViewManager._instance == null) {
            ViewManager._instance = new ViewManager();
        }
        return ViewManager._instance;
    }

    // viewStack: fw.ViewCtrl[] =  null;
    constructor() {
        // this.viewStack = [];
    }
}