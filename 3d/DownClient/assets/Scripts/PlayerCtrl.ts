import { _decorator, Component, math, Vec3, systemEvent, SystemEvent, EventMouse, AnimationClip, AnimationComponent } from "cc";
const { ccclass, property } = _decorator;

@ccclass("PlayerCtrl")
export class PlayerCtrl extends Component {
    private startJump: boolean = false;
    private jumpStep: number = 0;
    private currJumpTime: number = 0;
    private jumpTime: number = 0.1;
    private currJumpSpeed: number = 0;
    private currPos: Vec3 = cc.v3(0,0,0);
    private deltaPos: Vec3 = cc.v3(0,0,0);
    private targetPos: Vec3 = cc.v3(0,0,0);
    private isMoving: boolean = false;
    private currMoveIndex: number = 0;

    @property({type: AnimationComponent})
    public BodyAnim: AnimationComponent = null;


    start () {
    }
    public reset () {
        this.currMoveIndex = 0;
    }
    public setInputActive (active: boolean) {
        if (active) {
            systemEvent.on(SystemEvent.EventType.MOUSE_UP,this.onMouseUp,this);
        } else {
            systemEvent.off(SystemEvent.EventType.MOUSE_UP,this.onMouseUp,this);
        }
    }
    public onMouseUp (event: EventMouse) {
        if (event.getButton() === 0) {
            this.jumpByStep(1);
        } else if (event.getButton() === 2) {
            this.jumpByStep(2);
        }
    }
    public jumpByStep (step: number) {
        if (this.isMoving) {
            return;
        }
        this.startJump = true;
        this.jumpStep = step;
        this.currJumpTime = 0;
        this.currJumpSpeed = this.jumpStep / this.jumpTime;
        this.node.getPosition(this.currPos);
        math.Vec3.add(this.targetPos , this.currPos, cc.v3(this.jumpStep,0,0))
        
        this.isMoving = true;
        if (this.BodyAnim) {
            if (step === 1) {
                this.BodyAnim.play('OneStep');
            } else if (step === 2) {
                this.BodyAnim.play('TwoStep');
            }
        }
        this.currMoveIndex += step;
    }
    public onOnceJumpEnd () {
        this.isMoving = false;
        this.node.emit('JumpEnd',this.currMoveIndex);
    }
    update (deltaTime: number) {
        if (this.startJump) {
            this.currJumpTime += deltaTime;
            if (this.currJumpTime > this.jumpTime) {
                // end
                this.node.setPosition(this.targetPos);
                this.startJump = false;
                this.onOnceJumpEnd();
            } else {
                // tween
                this.node.getPosition(this.currPos);
                this.deltaPos.x = this.currJumpSpeed * deltaTime;
                math.Vec3.add(this.currPos,this.currPos,this.deltaPos);
                this.node.setPosition(this.currPos);
            }
        }
    }
}
