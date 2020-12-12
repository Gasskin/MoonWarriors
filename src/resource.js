/****************************************************************************
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.
 
 http://www.cocos2d-x.org
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var res = {
    HelloWorld_png : "res/HelloWorld.png",
    CloseNormal_png : "res/CloseNormal.png",
    CloseSelected_png : "res/CloseSelected.png",
//shared
    sh_arial_14_fnt : 'res/shared/arial-14.fnt',
    sh_arial_14_png : 'res/shared/arial-14.png',

//mainMenu
    TextureTransparentPack_plist : "res/mainMenu/textureTransparentPack.plist",
    TextureTransparentPack_png : "res/mainMenu/textureTransparentPack.png",
    mm_bg_png   : "res/mainMenu/bg.png",
    mm_logo_png : "res/mainMenu/logo.png",
    mm_mune_png : "res/mainMenu/menu.png",
    mm_flare_jpg : "res/mainMenu/flare.jpg",
    mm_btnEffect : "res/sound/effect/buttonEffect.mp3",
    mm_bgMusic_mp3 : "res/sound/music/mainMainMusic.mp3",

//gamePlay
    gp_TextureOpaquePack_plist : "res/gamePlay/textureOpaquePack.plist",
    gp_TextureOpaquePack_png : "res/gamePlay/textureOpaquePack.png",
    gp_b01_plist : "res/gamePlay/b01.plist",
    gp_b01_png : "res/gamePlay/b01.png",
    gp_Explosion_plist : "res/gamePlay/explosion.plist",
    gp_Explosion_png : "res/gamePlay/explosion.png",
    gp_explodeEffect_mp3 : 'res/sound/effect/explodeEffect.mp3',
    gp_bgMusic_mp3 : "res/sound/music/bgMusic.mp3",
    gp_shipDestroyEffect_mp3 : 'res/sound/effect/shipDestroyEffect.mp3',

//setting
    st_menuTitle_png : "res/setting/menuTitle.png",

//gameOver
    go_gameOver_png : "res/gameOver/gameOver.png",
    go_cocos2d_html5_png : "res/gameOver/cocos2d-html5.png"

};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
