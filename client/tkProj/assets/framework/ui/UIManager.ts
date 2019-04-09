
export default class UIMamager {
    public static getInstance():UIMamager{
        if( UIMamager.instance == null ){
            UIMamager.instance = new UIMamager();
        }
        return UIMamager.instance;
    }
    private static instance:UIMamager = null;
}
