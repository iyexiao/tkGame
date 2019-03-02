window["fw"] = {};//全局变量：游戏的框架
console.log(" game frmework");


import UIMamager from "./ui/UIManager";
(window['fw']).UIMamager = UIMamager.getInstance();
import EventManager from './event/EventManager'
(window["fw"] as any).EventManager = EventManager.getInstance();
import AudioManager from './audio/AudioManager'
(window["fw"] as any).AudioManager = AudioManager.getInstance();