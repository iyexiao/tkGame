/**
 * @class RandomBase
 * @author YeXiao
 * @deprecated 随机数处理
 * @date 2019年3月11日11:53:01
 * 
 */
export default class RandomBase {
    private m_w:number = 123456789;
    private m_z:number = 987654321;
    private mask:number = 0xffffffff;
    private _ranArr:Array<number> = null;
    private _seed:number = null;
    constructor(seed:number){
        this.setRandomSeed(seed);
    }
    // 设置随机种子
    setRandomSeed(seed:number)
    {
        this._seed = seed;
        this._ranArr =[];
    }
    // 获取下一个随机数
    getNext()
    {
        this.m_z = (36969 * (this.m_z & 65535) * this._seed + (this.m_z >> 16)) & this.mask;
        this.m_w = (18000 * (this.m_w & 65535) * this._seed + (this.m_w >> 16)) & this.mask;
        let result = ((this.m_z << 16) + this.m_w) & this.mask;
		result /= 4294967296;
        result += 0.5;
        // result = Math.round(result);//TODO:是否需要恒定精度
		this._ranArr.push(result);
		return result;
    }
    // 根据随机步数获取对应的随机数
    getCurrentStep(_index:number)
    {
        if(_index < this._ranArr.length){
            return this._ranArr[_index -1];
        }
        return 0;
    }
    // 根据给予的数组随机返回数组内一个数
    getOneRandomInArray(_arr:Array<number>)
    {
        let ran = Math.floor(this.getNext() * _arr.length + 1) - 1;
        return _arr[ran];
    }
}