export default class ViewManager {
    public static getInstance(): ViewManager {
        if (ViewManager.instance == null) {
            ViewManager.instance = new ViewManager();
        }
        return ViewManager.instance;
    }
    private static instance: ViewManager = null;

    // viewStack: fw.ViewCtrl[] =  null;
    constructor() {
        // this.viewStack = [];
    }
}
