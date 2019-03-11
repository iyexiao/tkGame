/**
 * @class HeroInfo
 * @author YeXiao
 * @deprecated 进战斗角色对应的json数据对象
 * @date 2019年3月11日11:53:01
 * 
 */
export default class HeroInfo {
    constructor(jsonData:string)
    {
        JSON.parse(jsonData);
    }
}