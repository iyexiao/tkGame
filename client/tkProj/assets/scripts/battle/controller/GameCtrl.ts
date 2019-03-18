import BattleCtrl from './BattleCtrl'
import BaseCtrl from './BaseCtrl'
import {ECamp} from '../utils/UtilsEnum'
import {HeroInfo} from '../info/HeroInfo'
import ModelHero from '../model/ModelHero'
import ConstValue from '../ConstValue';
/**
 * @class GameCtrl
 * @extends BaseCtrl
 * @author YeXiao
 * @deprecated 游戏总控制器
 * @since 2019-3-12 17:15:00
 * 
 */
export default class GameCtrl extends BaseCtrl {
    private _modelArr:Array<ModelHero> = null;
    /**
     * @description 战场上的英雄数组
     */
    get ModelArr(){
        return this._modelArr;
    }
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
    /**
     * @description 开始战斗
     */
    startBattle()
    {
        this.initModelsAura();
        this.startGameLoop();
    }
    /**
     * @description 初始化光环
     */
    initModelsAura()
    {
        console.log("======>>>>>>初始化光环技能")
        for (let index = 0; index < this._modelArr.length; index++) {
            this._modelArr[index].initAura();
        }
    }
    /**
     * @description 开始游戏轮询
     */
    startGameLoop()
    {
        this.BattleCtrl.HandleCtrl.sortModelHandle();
        for (let index = 0; index < ConstValue.GAME_TOTAL_FRAM; index++) {
            let tmpArr = this.BattleCtrl.HandleCtrl.getCurrentAttackModel();
            if (tmpArr.length > 0 ) {
                this.BattleCtrl.LogicCtrl.doAttackByHeroList(tmpArr);
            }
            this.updateModelFrame();
        }
    }
    /**
     * @description 更新战场上所有英雄的攻击时间
     */
    updateModelFrame(){
        for (let index = 0; index < this._modelArr.length; index++) {
            this._modelArr[index].updateHeroFrame();
        }
    }
}