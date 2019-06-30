/**
 * @class UIMamager
 * @author YeXiao
 * @deprecated 游戏视图UI管理类
 * @since 2019-5-22 23:56:23
 *
 */
export default class UIMamager {
    public static getInstance(): UIMamager {
        if ( UIMamager.instance == null ) {
            UIMamager.instance = new UIMamager();
        }
        return UIMamager.instance;
    }
    private static instance: UIMamager = null;
    /**
     * @description 加载一个预制体
     * @param pfName 预制体名字
     * @param callBack 回调函数
     */
    public loadPrefab(pfName: string,callBack?: Function) {
        cc.loader.loadRes(pfName,function(err,prefabAsset) {
            if (err) {
                return;
            }
            if (callBack) {
                callBack(prefabAsset);
            }
        });
    }
    /**
     * @description 加载一张图片并赋值给对应的spriteFrame
     * @param fName 
     * @param cc.Sprite 
     */
    public loadSpriteFrameRes(fName: string,sprite: cc.Sprite) {
        cc.loader.loadRes(fName,cc.SpriteFrame, function(err, spriteFrame){
            if (err) {
                cc.log("shhh???")
                return;
            }
            if (sprite) {
                sprite.spriteFrame = spriteFrame;
            }
        });
    }
}
