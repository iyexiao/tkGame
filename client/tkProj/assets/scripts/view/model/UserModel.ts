
let userInfo = {userId:1000};
/**
 * @class UserModel
 * @author YeXiao
 * @deprecated 用户数据
 * @since 2019-5-23 23:55:17
 *
 */
export default class UserModel {
    public static getInstance(): UserModel {
        if ( UserModel.instance == null ) {
            UserModel.instance = new UserModel();
        }
        return UserModel.instance;
    }
    private static instance: UserModel = null;
    
    /**
     * - 获取用户id
     */
    public getUserId() {
        return userInfo.userId;
    }
}