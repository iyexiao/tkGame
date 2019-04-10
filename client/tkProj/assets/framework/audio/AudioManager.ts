/**
 * @class AudioManager
 * @author YeXiao
 * @deprecated 音频音效管理单例
 * @since 2019-3-12 17:15:30
 *
 */
export default class AudioManager {
    public static getInstance(): AudioManager {
        if ( AudioManager.instance == null ) {
            AudioManager.instance = new AudioManager();
        }
        return AudioManager.instance;
    }
    private static instance: AudioManager = null;
}
