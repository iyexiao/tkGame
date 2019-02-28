window["fw"] = {};//全局变量：游戏的框架
console.log(" game frmework");


import GameWidget from "./ui/GameWidget";
(window['fw']).GameWidget = GameWidget.getInstance();
import EventManager from './event/EventManager'
(window["fw"] as any).EventManager = EventManager.getInstance();
import AudioManager from './audio/AudioManager'
(window["fw"] as any).AudioManager = AudioManager.getInstance();