/**
 * Created by lingjianfeng on 14-8-31.
 */



var GC = GC || {};

GC.winSize = cc.size(320, 480);

GC.h = GC.winSize.height;

GC.w = GC.winSize.width;

GC.w_2 = GC.winSize.width / 2 ;

GC.h_2 = GC.winSize.height / 2;

GC.SOUND_ON = true;

GC.GAME_STATE_ENUM = {
    HOME : 0,
    PLAY : 1,
    OVER : 2
}

GC.GAME_STATE = GC.GAME_STATE_ENUM.HOME;
