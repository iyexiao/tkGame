import BattleCtrl from './BattleCtrl'
import BaseCtrl from './BaseCtrl';
import ModelBase from '../model/ModelBase';
/**
 * @class HandleCtrl
 * @extends BaseCtrl
 * @author YeXiao
 * @deprecated 游戏出手序列控制器
 * @since 2019-3-18 16:18:25
 * 
 */
export default class HandleCtrl extends BaseCtrl {
    private _handleArr:Array<ModelBase> = null;
    constructor(ctrl:BattleCtrl)
    {
        super(ctrl);
    }
    /**
     * @description 对所有英雄根据当前攻速排序(阵营1的有先手优势)
     */
    sortModelHandle(){
        console.log("======>>>>>>根据攻速排序对所有英雄出手顺序")
        this._handleArr = this.BattleCtrl.GameCtrl.ModelArr.slice().sort((a,b)=>{
            let aSpeed = a.getHeroAtkFrame();
            let bSpeed = b.getHeroAtkFrame()
            if(aSpeed > bSpeed) {
                return 1;
            }else if(aSpeed == bSpeed){
                if(a.getHeroCamp() >= b.getHeroCamp()) return 1;
            }
            return 0;
        });
        if (this._handleArr.length <= 0) {
            return;
        }
        //排序完成之后，需要设置攻击间隔
        let tmpFrame = this._handleArr[0].HeroInfo.CurrAtkFrame;
        this._handleArr.forEach(element => {
            element.HeroInfo.setCurrAtkFrame(element.HeroInfo.CurrAtkFrame - tmpFrame);
        });
    }
    /**
     * 从出手队列里面移除某个英雄
     * @param model 
     * @returns 移除是否成功
     */
    delModelHandle(model:ModelBase):boolean{
        let index = this._handleArr.indexOf(model);
        if(index > -1){
            this._handleArr.splice(index,1);
            return true;
        }
        return false;
    }
    /**
     * 向出手队列里面添加一个英雄,此时也已经做的排序，并且是从后往前排序，也就是说，如果遇到相同atkspeed的时候，只会排在最后面
     * @param model 
     * @returns 添加是否成功
     */
    addModelHandle(model:ModelBase):boolean{
        let length = this._handleArr.length;
        let lastModel = this._handleArr[length - 1];
        //如果比最后一个英雄的出手顺序还低，那就直接添加至末尾
        if(lastModel.getHeroAtkFrame() <= model.getHeroAtkFrame()){
            this._handleArr.push(model);
            return true;
        }
        for (let index = length - 2; index >= 0; index--) {
            const tmpModel = this._handleArr[index];
            if (tmpModel.getHeroAtkFrame() <= model.getHeroAtkFrame()) {
                this._handleArr.splice(index+1,0,model);
                return true;
            }
        }
        return false;
    }
    /**
     * @description 获取准备出手的英雄
     * @returns ModelBase
     */
    getCurrentAttackModel():Array<ModelBase>{
        let tmpArr = new Array<ModelBase>();
        for (let index = 0; index < this._handleArr.length; index++) {
            const model = this._handleArr[index];
            if (model.HeroInfo.CurrAtkFrame == 0 ) {
                tmpArr.push(model);
            }else{
                break;
            }
        }
        return tmpArr;
    }
}