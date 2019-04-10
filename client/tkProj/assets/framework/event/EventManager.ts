interface IEvent {
    eventType: string;
    thisObject?: any;
    callback: (data: any) => void;
}

export default class EventManager {
    public static getInstance(): EventManager {
        if (EventManager.instance == null) {
            EventManager.instance = new EventManager();
        }
        return EventManager.instance;
    }
    private static instance: EventManager = null;
    private eventList: {[key: number]: IEvent[]} = null;

    constructor() {
        this.eventList = {};
    }
    /**
     * - 添加一个事件监听
     * @param eventType 事件类型
     * @param callback 回调方法
     */
    public addEventListener(eventType: string, callback: any, thisObject?: any) {
        if (!eventType || !callback) {
            return;
        }
        const tmpArr: IEvent[] = this.eventList[eventType] || [];
        for (const iterator of tmpArr) {
            if (iterator.callback === callback) {
                return;
            }
        }
        const ievent: IEvent = {
            eventType,
            thisObject,
            callback,
        };
        tmpArr.push(ievent);
        this.eventList[eventType] = tmpArr;
    }
    /**
     * - 事件分发
     */
    public dispatchEvent(eventType: string, params?: any) {
        if (!eventType) {
            return;
        }
        const tmpArr: IEvent[] = this.eventList[eventType] || [];
        for (const iterator of tmpArr) {
            if (iterator.thisObject) {
                // 在回调的时候, 不要直接func(agrs) 而是改成 func.call(目标对象, args)
                iterator.callback.call(iterator.thisObject, params);
            } else {
                iterator.callback(params);
            }
        }
    }
    /**
     * - 移除一个事件监听
     * @param eventType
     * @param callback
     */
    public removeEventListener(eventType: string, callback: any) {
        if (!eventType || !callback) {
            return;
         }
        const tmpArr: IEvent[]  = this.eventList[eventType] || [];

        for (let i = 0; i < tmpArr.length; i++) {
             if (tmpArr[i].callback === callback) {
                tmpArr.splice(i, 1);
                break;
             }
         }
        if (tmpArr.length === 0) {
             delete this.eventList[eventType];
         }
    }
}
