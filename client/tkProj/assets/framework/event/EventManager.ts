interface IEvent {
    eventType: string,
    callback: (data) => void
} 

export default class EventManager {
    static _instance: EventManager = null;
    static getInstance(): EventManager {
        if (EventManager._instance == null) {
            EventManager._instance = new EventManager();
        }
        return EventManager._instance;
    }
    _eventList: {[key: number]: Array<IEvent>} = null;

    constructor() {
        this._eventList = {};
    }
    /**
     * - 添加一个事件监听
     * @param eventType 事件类型
     * @param callback 回调方法
     */
    addEventListener(eventType: string, callback: any) {
        if (!eventType || !callback) { 
            return;
        }
        let tmpArr: Array<IEvent> = this._eventList[eventType] || [];
        for (let i = 0; i < tmpArr.length; i++) {
            if (tmpArr[i].callback === callback) {
                return;
            }
        } 
        let ievent: IEvent = {
            eventType: eventType,
            callback: callback
        };
        tmpArr.push(ievent);
        this._eventList[eventType] = tmpArr;
    } 
    /**
     * - 事件分发
     */
    dispatchEvent(eventType: string, params?: any) {
        if (!eventType) {
            return;
        }
        let tmpArr: Array<IEvent> = this._eventList[eventType] || [];
        for (let i = 0; i < tmpArr.length; i++) {
            let ievent = tmpArr[i];
            ievent.callback(params);
        }
    }
    /**
     * - 移除一个事件监听
     * @param eventType 
     * @param callback 
     */
    removeEventListener(eventType: string, callback: any) {
        if (!eventType || !callback) {
            return;
         }
         let tmpArr: Array<IEvent>  = this._eventList[eventType] || [];

         for (let i = 0; i < tmpArr.length; i++) {
             if (tmpArr[i].callback === callback) {
                tmpArr.splice(i, 1);
                break;
             }
         }
         if (tmpArr.length == 0) {
             delete this._eventList[eventType];
         }
    }
}