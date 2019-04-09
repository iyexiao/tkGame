import RandomBase from "../../../framework/utils/RandomBase";

/**
 * @class RandomCtrl
 * @author YeXiao
 * @deprecated 战斗随机种子控制器，继承RandomBase
 * @extends RandomBase
 * @since 2019-3-12 17:15:30
 * 
 */

export default class RandomCtrl extends RandomBase {

    constructor(seed: number) {
        super(seed);
    }
    /**
     * 返回数组内N个随机数
     * @param arr 数组
     * @param count 个数
     */
    public getRandomsInArrayByCount(arr: any[], count: number) {
        if (count >= arr.length) {
            return arr;
        }
        const tmpArr = [];
        const sourceArr = arr.slice();
        for (let index = 0; index < count; index++) {
            const ran = Math.floor(this.getNext() * sourceArr.length + 1) - 1;
            tmpArr.push(sourceArr[ran]);
            sourceArr.splice(ran, 1 );
        }
        return tmpArr;
    }
}
