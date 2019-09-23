import { _decorator, Component, Node, Prefab, CCInteger, instantiate, LabelComponent } from "cc";
import { PlayerCtrl } from "./PlayerCtrl";
const { ccclass, property } = _decorator;

enum BlockType {
    BT_NONE,
    BT_STONE,
}
enum GameState {
    GS_INIT,
    GS_PLAYING,
    GS_END,
}

@ccclass("GameMgr")
export class GameMgr extends Component {

    @property({type: Prefab})
    public cuberPrfb: Prefab = null;
    @property({type: CCInteger})
    public roadLength: Number = 50;
    @property({type: PlayerCtrl})
    public playerCtrl: PlayerCtrl = null;
    @property({type: Node})
    public startMenu: Node = null;
    @property({type: LabelComponent})
    public stepLabel: LabelComponent = null;

    private road: number[] = [];
    private currState: GameState = GameState.GS_INIT;

    start () {
        this.setCurrState(GameState.GS_INIT);
        this.playerCtrl.node.on('JumpEnd',this.onPlayerJumpEnd,this);
    }
    init () {
        this.startMenu.active = true;
        this.generateRoad();
        this.playerCtrl.setInputActive(false);
        this.playerCtrl.node.setPosition(cc.v3());
        this.playerCtrl.reset();
    }
    
    public setCurrState(v : GameState) {
        switch (v) {
            case GameState.GS_INIT:
                this.init();
                break;
            case GameState.GS_PLAYING:
                this.startMenu.active = false;
                this.stepLabel.string = '0';
                setTimeout(()=>{
                    this.playerCtrl.setInputActive(true);
                },0.1);
                break;
            case GameState.GS_END:
                break;
        }
        this.currState = v;
    }
    public onStartButtonClicked () {
        this.setCurrState(GameState.GS_PLAYING);
    }
    public checkResult (moveIndex: number) {
        if (moveIndex <= this.roadLength) {
            if (this.road[moveIndex] == BlockType.BT_NONE ) {
                this.setCurrState(GameState.GS_INIT);
            }
        } else {
            this.setCurrState(GameState.GS_INIT);
        }
    }
    public onPlayerJumpEnd (moveIndex: number) {
        this.stepLabel.string = '' + moveIndex;
        this.checkResult(moveIndex);
    }
    
    public generateRoad () {
        this.node.removeAllChildren();
        this.road = [];
        this.road.push(BlockType.BT_STONE);

        for (let i = 1; i < this.roadLength; i++) {
           if (this.road[i -1] === BlockType.BT_NONE) {
               this.road.push(BlockType.BT_STONE);
           } else {
               this.road.push(Math.floor(Math.random() * 2));
           }
        }
        for (let j = 0; j < this.roadLength; j++) {
            let block: Node = this.spawnBlockByType(this.road[j]);
            if (block) {
                this.node.addChild(block);
                block.setPosition(j,-1.5,0);
            }
        }
    }
    public spawnBlockByType (type: BlockType): Node {
        let block: Node = null;
        switch (type) {
            case BlockType.BT_STONE:
                block = instantiate(this.cuberPrfb);
                break;
        
            default:
                break;
        }
        return block;
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
