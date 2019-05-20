import ConstValue from "../../battle/ConstValue";
import TestManager from "../TestManager";
import BattleCtrl from "../../battle/controller/BattleCtrl";
import { EGameType } from "../../battle/utils/UtilsEnum";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    private updateDt: number = 0; // 游戏刷新帧率
    //游戏速率(回放的时候可能需要调整速率,战斗胜利的慢动作也可以这里处理)
    private updateSpeed: number = 1;
    private updateSpeedCount: number = 0;
	private gameStep;// 游戏状态
	private battleCtrl:BattleCtrl = null;

    start () {
		let battleInfo = TestManager.getInstance().getDebugBattleInfo();
		this.battleCtrl = new BattleCtrl(JSON.parse(battleInfo),EGameType.view);
		this.battleCtrl.startOneBattle();
    }
    // 真正的更新循环
	public runBySpeedUpdate() {
		this.battleCtrl.GameCtrl.updateModelFrame();
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
				// // 如果游戏结束了，就返回
				// if (this.gameStep == ConstValue.gameStep.result) {
				// 	break;
				// };
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
        this.updateDt += dt;
        let frameTime = ConstValue.GAME_FRAME_RATE;
        if (this.updateDt > frameTime) {
            let loop = Math.floor(this.updateDt / frameTime);
            for (let index = 1; index <= loop; index++) {
                this.updateFrame(frameTime);
            }
            this.updateDt -= frameTime * loop;
        }
    }
    // update (dt) {}
}
