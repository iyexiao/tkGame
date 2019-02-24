## 配置表excel导表说明  
### [win]  
	1.安装python 3.7.0   
	2.安装xlrd插件https://pypi.python.org/pypi/xlrd (进入对应目录执行python setup.py install)   
	3.安装openpyxl插件https://pypi.python.org/pypi/openpyxl   
### [win/mac]  
    3.运行python excel2json.py excel json   


## Client架构  
### 一、客户端与战斗服同一套代码  
* 1.带视图：通过BattleUpdate内的update驱动gamecontroler中的startloop。  
* 2.纯跑逻辑：通过操作序列和startloop帧数走逻辑。  