/**
 * @class RandomBase
 * @author YeXiao
 * @deprecated 随机数处理
 * @since 2019-3-12 17:15:30
 *
 */
export default class RandomBase {
    private mw: number = 123456789;
    private mz: number = 987654321;
    private mask: number = 0xffffffff;
    private ranArr: number[] = null;
    private seed: number = null;
    constructor(seed: number) {
        this.setRandomSeed(seed);
    }
    // 设置随机种子
    public setRandomSeed(seed: number) {
        this.seed = seed;
        this.ranArr = [];
    }
    // 获取下一个随机数
    public getNext() {
// tslint:disable-next-line: no-bitwise
        this.mz = (36969 * (this.mz & 65535) * this.seed + (this.mz >> 16)) & this.mask;
// tslint:disable-next-line: no-bitwise
        this.mw = (18000 * (this.mw & 65535) * this.seed + (this.mw >> 16)) & this.mask;
// tslint:disable-next-line: no-bitwise
        let result = ((this.mz << 16) + this.mw) & this.mask;
        result /= 4294967296;
        result += 0.5;
        // result = Math.round(result);//TODO:是否需要恒定精度
        this.ranArr.push(result);
        return result;
    }
    // 根据随机步数获取对应的随机数
    public getCurrentStep(index: number) {
        if (index < this.ranArr.length) {
            return this.ranArr[index - 1];
        }
        return 0;
    }
    // 根据给予的数组随机返回数组内一个数
    public getOneRandomInArray(arr: any[]) {
        const ran = Math.floor(this.getNext() * arr.length + 1) - 1;
        return arr[ran];
    }
}
