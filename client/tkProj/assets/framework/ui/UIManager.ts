
export default class UIMamager {

    static _instance:UIMamager = null;
    static getInstance():UIMamager{
        if( UIMamager._instance == null ){
            UIMamager._instance = new UIMamager();
        }
        return UIMamager._instance;
    }
}
