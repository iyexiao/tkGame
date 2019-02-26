
export default class GameWidget {

    static _instance:GameWidget = null;
    static getInstance():GameWidget{
        if( GameWidget._instance == null ){
            GameWidget._instance = new GameWidget();
        }
        return GameWidget._instance;
    }
}
