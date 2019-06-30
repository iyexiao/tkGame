import UIMamager from "../../../framework/ui/UIManager";
import ConstValue from "../../battle/ConstValue";
import BattleModel from "../model/BattleModel";
import ModelBase from "../../battle/model/ModelBase";
import EventManager from "../../../framework/event/EventManager";
import { EBattleTrigger } from "../../battle/utils/UtilsEnum";
import { EHeroAttr, HeroInfo } from "../../battle/info/HeroInfo";

const {ccclass, property} = cc._decorator;
/**
 * @class BattleHeroTmpl
 * @author YeXiao
 * @deprecated 战斗中角色信息显示类
 * @since 2019-5-22 23:56:23
 *
 */
@ccclass
export default class BattleHeroTmpl extends cc.Component {
    private heroSp:cc.Sprite = null;// 英雄立绘
    private typeBgSp:cc.Sprite = null;// 英雄背景
    private typeSp:cc.Sprite = null; // 英雄国家归属
    private nameLab:cc.Label = null; // 英雄名字
    private starNd:cc.Node = null;  // 星级层级
    private hpPb:cc.ProgressBar = null; // 血条层级
    private heroModel:ModelBase = null; //英雄模型数据

    onLoad() {
        this.heroSp = cc.find("Sp_Hero",this.node).getComponent(cc.Sprite);
        this.typeBgSp = cc.find("Sp_Card_Bg",this.node).getComponent(cc.Sprite);
        this.typeSp = cc.find("Sp_Type",this.node).getComponent(cc.Sprite);
        this.nameLab = cc.find("Lab_Name",this.node).getComponent(cc.Label);
        this.starNd = cc.find("Nd_Star",this.node);
        this.hpPb = cc.find("PB_HP",this.node).getComponent(cc.ProgressBar);
        EventManager.getInstance().addEventListener(EBattleTrigger.onPropChange,this.onPropChange,this)
    }

    /**
     * @description 更新英雄显示信息
     * @param model 
     */
    public showHeroInfo(model:ModelBase) {
        this.heroModel = model;
        if (model.HeroInfo === null) {
            return;
        }
        const heroDB = model.HeroInfo.HeroDB;
        const heroInfo = model.HeroInfo.IHeroInfo;
        // 英雄立绘
        UIMamager.getInstance().loadSpriteFrameRes("hero/" + heroDB.cardRes,this.heroSp);
        // 英雄国家
        UIMamager.getInstance().loadSpriteFrameRes("ui/heroui_c" + heroDB.conuntryType,this.typeSp);
        // 英雄品阶背景
        UIMamager.getInstance().loadSpriteFrameRes("ui/heroui_wujiang" + heroInfo.quality,this.typeBgSp);
        // 英雄名字
        this.nameLab.string = heroDB.name;
        // 英雄星级
        for (let index = 1; index <= ConstValue.HERO_MAX_STAR; index++) {
            const starNd = this.starNd.getChildByName("Sp_Star"+index);
            if (index <= heroInfo.star) {
                starNd.active = true;
            }else {
                starNd.active = false;
            }
        }
        // 血条颜色
        if (BattleModel.getInstance().getUserCamp() == model.getHeroCamp()) {
            UIMamager.getInstance().loadSpriteFrameRes("common/common_xueliang2",this.hpPb.barSprite);
        }else{
            UIMamager.getInstance().loadSpriteFrameRes("common/common_xueliang1",this.hpPb.barSprite);
        }
        const per = Math.ceil(model.HeroInfo.HeroAttr.hp / model.HeroInfo.HeroAttr.maxHp * 100 )/100;
        this.hpPb.progress = per;
    }
    /**
     * @description 角色属性变化
     * @param params {model,key}
     */
    public onPropChange(params:any) {
        cc.log("aa===",params.model != this.heroModel,params.model !== this.heroModel)
        if (params.model !== this.heroModel) {
            return;
        }
        if (params.key === EHeroAttr.hp) {
            cc.log("血量变化====");
            const heroInfo:HeroInfo = this.heroModel.HeroInfo;
            const per = Math.ceil(heroInfo.HeroAttr.hp / heroInfo.HeroAttr.maxHp * 100 )/100;
            this.hpPb.progress = per;
        }
    }
    
}