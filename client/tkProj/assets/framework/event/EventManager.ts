interface IEvent {
    type: number,
    priority: number, 
    class_id: string,
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
    event_cache: {[key: number]: Array<IEvent>} = null;
}