import ConstValue from "../../battle/ConstValue";
import BattleCtrl from "../../battle/controller/BattleCtrl";
import { EGameType, EGameStep, ECamp } from "../../battle/utils/UtilsEnum";
import { IBattleInfo } from "../../battle/info/BattleInfo";
import UIMamager from "../../../framework/ui/UIManager";
import BattleHeroTmpl from "../hero/BattleHeroTmpl";
import BattleModel from "../model/BattleModel";
import ModelBase from "../../battle/model/ModelBase";

const {ccclass, property} = cc._decorator;
/**
 * @class BattleView
 * @author YeXiao
 * @deprecated 游戏视图主逻辑
 * @since 2019-5-22 23:56:23
 *
 */
@ccclass
export default class BattleView extends cc.Component {
    private updateDt: number = 0; // 游戏刷新帧率
    //游戏速率(回放的时候可能需要调整速率,战斗胜利的慢动作也可以这里处理)
    private updateSpeed: number = 1;
    private updateSpeedCount: number = 0;
	private gameStep;// 游戏状态
	private battleCtrl:BattleCtrl = null;
	private centerNd:cc.Node = null;// 英雄所在层级

	onLoad() {
		this.gameStep = EGameStep.wait;
		this.centerNd = cc.find("Canvas/Nd_Battle/Nd_Center");
	}
	

    // start () {
	// }
	/**
	 * @description 加载战斗数据，并开始一场战斗
	 * @param bInfo 
	 * @param gType 
	 */
	public loadAndRunBattle(bInfo: IBattleInfo, gType?: EGameType) {
		this.battleCtrl = new BattleCtrl(bInfo,gType);
		// 设置战斗控制器
		BattleModel.getInstance().setBattleCtrl(this.battleCtrl);
		// 初始化所有牌的数据
		this.initUI();
		this.battleCtrl.startOneBattle();
	}
	public initUI() {
		const self = this;
		UIMamager.getInstance().loadPrefab("prefab/prefab_card",function(pAsset: any) {
			const battleInfo = self.battleCtrl.BattleInfo;
			battleInfo.users.forEach(user => {
				let posList = ConstValue.GAME_POS_0; //TODO:如果玩家所属阵营为2，需要换方向
				if (user.camp == ECamp.camp2) {
					posList = ConstValue.GAME_POS_1;
				}
				user.heros.forEach(hero => {
					
					const pNode:cc.Node = cc.instantiate(pAsset);
					pNode.parent = self.centerNd;
					const pos = posList[hero.posIdx];
					pNode.x = pos[0];
					pNode.y = pos[1];
					// 显示英雄数据
					const model:ModelBase = self.battleCtrl.GameCtrl.getHeroModelByCampPos(user.camp,hero.posIdx);
					const script:BattleHeroTmpl = pNode.addComponent("BattleHeroTmpl");
					script.showHeroInfo(model);
				});
			});
		})
	}
	
	// *************************游戏更新相关逻辑******************************************
    // 真正的更新循环
	public runBySpeedUpdate() {
		// 如果游戏结束了，就返回
		if (this.gameStep == EGameStep.result) {
			cc.log("战斗结束了");
			return;
		};
		this.battleCtrl.GameCtrl.doBattleLockStep();
	};
	// 设置游戏速率
	public setGameSpeed(speed :number) {
		this.updateSpeed = speed;
	};
    // 循环
    public updateFrame(dt: number) {
        let lastCount = 0;
		if (this.updateSpeed == 1) {
			this.runBySpeedUpdate();
		}else if ( this.updateSpeed < 1){
			// 判断多少帧刷新一次函数
			lastCount = Math.round(this.updateSpeed);
			this.updateSpeedCount += this.updateSpeed;
			if (Math.round(this.updateSpeedCount) > lastCount) {
				// 如果是达到一次计数了 那么就做一次刷新函数
				this.runBySpeedUpdate();
			};
		}else{
			// 先计算需要刷新多少次
			let count = Math.floor(this.updateSpeed);
			for (var i = 1; i <= count; i++) {
				this.runBySpeedUpdate();
			};
			let leftCount = this.updateSpeed - count;
			this.updateSpeedCount += count;
			// 如果不是整数倍数加速
			if (leftCount > 0) {
				lastCount = Math.round(this.updateSpeedCount);
				this.updateSpeedCount += leftCount;
				// 如果四舍五入后达到一次计数了 那么就做一次刷新函数
				if (Math.round(this.updateSpeedCount) > lastCount) {
					this.runBySpeedUpdate();
				};
			};
		};
    }
    /**
     * 游戏循环体
     * @param dt 
     */
    public startLoop(dt: number) {
        this.updateDt = this.updateDt + dt;
        let frameTime = ConstValue.GAME_FRAME_RATE;
        if (this.updateDt > frameTime) {
            let loop = Math.floor(this.updateDt / frameTime);
            for (let index = 1; index <= loop; index++) {
                this.updateFrame(frameTime);
            }
			this.updateDt -= frameTime * loop;
        }
    }
    update (dt) {
		if(this.battleCtrl && this.battleCtrl.GameCtrl.GameStep >= EGameStep.ready) {
			this.startLoop(dt);
		}
	}
}
