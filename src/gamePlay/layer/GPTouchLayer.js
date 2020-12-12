/**
 * Created by lingjianfeng on 14-8-31.
 */

STATE_PLAYING = 0;
STATE_GAMEOVER = 1;

MAX_CONTAINT_WIDTH = 40;
MAX_CONTAINT_HEIGHT = 40;

//当前层对外引用，也就是说，可以在其他地方直接通过g_GPTouchLayer指向当前层，从而获取当前层里面的属性和方法等等。
var g_GPTouchLayer;
var GPTouchLayer = cc.Layer.extend({
    _texOpaqueBatch : null,
    _texTransparentBatch : null,
    _lbScore : null,
    _ship : null,
    _state : STATE_PLAYING,
    _time : null,
    _tmpScore : 0,
    _lbLife : null,
    _explosions : null,
    ctor : function(){
        this._super();
        this.playMusic();
        GC.LIFE = 4;
        GC.SCORE = 0;
        //重置相关信息
        GC.CONTAINER.SPARKS = [];
        GC.CONTAINER.ENEMIES = [];
        GC.CONTAINER.ENEMY_BULLETS = [];
        GC.CONTAINER.PLAYER_BULLETS = [];
        GC.CONTAINER.EXPLOSIONS = [];
        GC.GAME_STATE = GC.GAME_STATE_ENUM.PLAY;
        //指向当前层
        g_GPTouchLayer = this;
        this._state = STATE_PLAYING;
       //this._levelManager = new LevelManager(this);
        this.initBatchNode();
        this.initAboutInfo();
        //this.initShip();
        //this.scheduleUpdate();
        //this.schedule(this.scoreCounter, 1);
        //子弹敌人等预备
        //BulletSprite.preSet();
        //EnemySprite.preSet();
        //SparkEffectSprite.preSet();
       // ExplosionSprite.preSet();
    },
    playMusic : function(){
        if (GC.SOUND_ON){
            cc.audioEngine.playMusic(res.gp_bgMusic_mp3, true);
        }
    },
    initBatchNode : function(){
        //创建3个BatchNode，并为其中一个设置渲染方式
        //光效
        var texOpaque = cc.textureCache.addImage(res.gp_TextureOpaquePack_png);
        this._texOpaqueBatch = new cc.SpriteBatchNode(texOpaque);
        this._texOpaqueBatch.setBlendFunc(cc.SRC_ALPHA, cc.ONE);//设置渲染模式
        this.addChild(this._texOpaqueBatch);
        //飞船
        var texTransparent = cc.textureCache.addImage(res.TextureTransparentPack_png);
        this._texTransparentBatch = new cc.SpriteBatchNode(texTransparent);
        this.addChild(this._texTransparentBatch);
        //爆炸
        var explosionTexture = cc.textureCache.addImage(res.gp_Explosion_png);
        this._explosions = new cc.SpriteBatchNode(explosionTexture);
        this._explosions.setBlendFunc(cc.SRC_ALPHA, cc.ONE);
        this.addChild(this._explosions);
    },
    initAboutInfo : function(){
        //分数
        this._lbScore = new cc.LabelBMFont("Score: 0", res.sh_arial_14_fnt);
        this._lbScore.attr({
            anchorX: 1,
            anchorY: 0,
            x: GC.w - 5,
            y: GC.h - 30
        });
        this._lbScore.textAlign = cc.TEXT_ALIGNMENT_RIGHT;
        this.addChild(this._lbScore, 1000);
        //生命图标
        var life = new cc.Sprite("#ship01.png");
        life.attr({
            scale: 0.6,
            x: 30,
            y: 460
        });
        this._texTransparentBatch.addChild(life, 1, 5);
        //生命数量
        this._lbLife = new cc.LabelTTF("0", "Arial", 20);
        this._lbLife.attr({
            x : 60,
            y : 463,
            color : cc.color(255, 0, 0)
        });
        this.addChild(this._lbLife, 1000);
    },
    initShip : function(){
        this._ship = new ShipSprite("#ship01.png");
        this._ship.attr({
            x : 160,
            y : 60
        });
        this.addChild(this._ship, 1);
    },
    //游戏时时刷新
    update:function (dt) {
        if (this._state == STATE_PLAYING) {
            //UI在这边更新
            this.updateUI();
            //敌人在这里面产生，以及界面上
            this.moveActiveUnit(dt);
            //碰撞检测
            this.checkIsCollide();
            // 检测我们的飞船重生
            this.checkIsReborn();
            //这个部分被我直接干掉了。。。因为，重复代码，没什么内容
            //this._movingBackground(dt);
        }
    },
    //飞船，子弹等等BatchNode子节点的一个更新
    moveActiveUnit : function(dt){
        var selChild, children = this._texOpaqueBatch.getChildren();
        for (var i in children) {
            selChild = children[i];
            if (selChild && selChild.active){
                selChild.update(dt);
            }
        }
        children = this._texTransparentBatch.getChildren();
        for (i in children) {
            selChild = children[i];
            if (selChild && selChild.active)
                selChild.update(dt);
        }
        this._ship.update(dt);
    },
    updateUI:function () {
        this._tmpScore += 1;
        this._lbLife.setString(GC.LIFE + '');
        this._lbScore.setString("Score: " + this._tmpScore);
    },
    //分数在这里面加
    scoreCounter:function () {
        if (this._state == STATE_PLAYING) {
            this._time++;
            this._levelManager.loadLevelResource(this._time);
        }
    },
    checkIsCollide:function () {
        var selChild, bulletChild;
        // check collide
        var i, locShip = this._ship;
        for (i = 0; i < GC.CONTAINER.ENEMIES.length; i++) {
            selChild = GC.CONTAINER.ENEMIES[i];
            if (!selChild.active) {
                continue;
            }
            for (var j = 0; j < GC.CONTAINER.PLAYER_BULLETS.length; j++) {
                bulletChild = GC.CONTAINER.PLAYER_BULLETS[j];
                if (bulletChild.active && this.collide(selChild, bulletChild)) {
                    bulletChild.hurt();
                    selChild.hurt();
                }
            }
            if (this.collide(selChild, locShip)) {
                if (locShip.active) {
                    selChild.hurt();
                    locShip.hurt();
                }
            }
        }
        for (i = 0; i < GC.CONTAINER.ENEMY_BULLETS.length; i++) {
            selChild = GC.CONTAINER.ENEMY_BULLETS[i];
            if (selChild.active && this.collide(selChild, locShip)) {
                if (locShip.active) {
                    selChild.hurt();
                    locShip.hurt();
                }
            }
        }
    },
    //坚持飞船重生
    checkIsReborn:function () {
        var locShip = this._ship;
        if (GC.LIFE > 0 && !locShip.active) {
            locShip.born();
        }
        else if (GC.LIFE <= 0 && !locShip.active) {
            this._ship = null;
            this._state = STATE_GAMEOVER;
            GC.GAME_STATE = GC.GAME_STATE_ENUM.OVER;
            var action = cc.sequence(
                cc.delayTime(0.2),
                cc.callFunc(this.onGameOver, this)
            );
            this.runAction(action);
        }
    },
    //碰撞坚持
    collide:function (a, b) {
        var ax = a.x;
        var ay = a.y;
        var bx = b.x;
        var by = b.y;
        if (Math.abs(ax - bx) > MAX_CONTAINT_WIDTH || Math.abs(ay - by) > MAX_CONTAINT_HEIGHT)
            return false;
        var aRect = a.collideRect(ax, ay);
        var bRect = b.collideRect(bx, by);
        return cc.rectIntersectsRect(aRect, bRect);
    },
    //游戏结束
    onGameOver : function(){
        cc.log("onGameOver");
        cc.audioEngine.stopMusic();
        cc.audioEngine.stopAllEffects();
        cc.director.runScene(new cc.TransitionFade(1.2, new GameOverScene()));
    }
});

GPTouchLayer.prototype.addBullet = function (bullet, zOrder, mode) {
    this._texOpaqueBatch.addChild(bullet, zOrder, mode);
};
GPTouchLayer.prototype.addEnemy = function (enemy, z, tag) {
    this._texTransparentBatch.addChild(enemy, z, tag);
};
GPTouchLayer.prototype.addExplosions = function (explosion) {
    this._explosions.addChild(explosion);
};
GPTouchLayer.prototype.addSpark = function (spark) {
    this._texOpaqueBatch.addChild(spark);
};
