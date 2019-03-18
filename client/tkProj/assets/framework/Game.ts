let fw = "fw";
window[fw] = {};//全局变量：游戏的框架
console.log(" game frmework");


import UIMamager from "./ui/UIManager";
(window[fw]).UIMamager = UIMamager.getInstance();
import EventManager from './event/EventManager'
(window[fw] as any).EventManager = EventManager.getInstance();
import AudioManager from './audio/AudioManager'
(window[fw] as any).AudioManager = AudioManager.getInstance();
import Localization from './Localization'
(window[fw] as any).Localization = Localization.getInstance();
(window[fw] as any)._T = Localization.getInstance().getText.bind(Localization.getInstance());
import LogManager from "./log/LogManager"
(window[fw] as any).log = LogManager.getInstance().log.bind(LogManager.getInstance());
