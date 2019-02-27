interface IEvent {
    type: number,
    priority: number, 
    class_id: string,
    callback: (data) => void
} 

export default class EventManager {
    static singleInstance: EventManager = null;
    static getInstance(): EventManager {
        if (EventManager.singleInstance == null) {
            EventManager.singleInstance = new EventManager();
        }
        return EventManager.singleInstance;
    }
    event_cache: {[key: number]: Array<IEvent>} = null;
}