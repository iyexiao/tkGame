import BattleCtrl from './BattleCtrl'
import BaseCtrl from './BaseCtrl'
import {ECamp} from '../utils/UtilsEnum'
import {HeroInfo} from '../info/HeroInfo'
import ModelHero from '../model/ModelHero'
/**
 * @class GameCtrl
 * @extends BaseCtrl
 * @author YeXiao
 * @deprecated 游戏总控制器
 * @since 2019-3-12 17:15:00
 * 
 */
export default class GameCtrl extends BaseCtrl {
    /**
     * @description 战场上的英雄数组
     */
    private _modelArr:Array<ModelHero> = null;
    constructor(ctrl:BattleCtrl)
    {
        super(ctrl);
        this._modelArr = new Array<ModelHero>();
        this.initModelList();
    }
    /**
     * @description 初始化战场上模型
     */
    initModelList()
    {
        let tmpArr = [ECamp.camp1,ECamp.camp2];
        for(let key in tmpArr)
        {
            let arr = this.BattleCtrl.LevelCtrl.getHeroInfoByCamp(tmpArr[key]);
            for (let index = 0; index < arr.length; index++) {
                let model = this.createOneModelByHeroInfo(arr[index]);
                this._modelArr.push(model);
            }
        }
        
    }
    /**
     * @description 根据英雄数据创建一个英雄单位模型
     * @param hero 
     * @returns ModelHero
     */
    createOneModelByHeroInfo(hero:HeroInfo):ModelHero
    {
        let model = new ModelHero(this,hero);
        return model;
    }
}