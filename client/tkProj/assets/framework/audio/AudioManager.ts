/**
 * @class AudioManager
 * @author YeXiao
 * @deprecated 音频音效管理单例
 * @date 2019-2-28 23:38:18
 * 
 */
export default class AudioManager {
    static _instance:AudioManager = null;
    static getInstance():AudioManager{
        if( AudioManager._instance == null ){
            AudioManager._instance = new AudioManager();
        }
        return AudioManager._instance;
    }
}