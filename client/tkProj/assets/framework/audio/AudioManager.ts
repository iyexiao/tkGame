/**
 * @class AudioManager
 * @author YeXiao
 * @deprecated 音频音效管理单例
 * @since 2019-3-12 17:15:30
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