var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Rabbit = (function (_super) {
    __extends(Rabbit, _super);
    function Rabbit(direction, type) {
        var _this = _super.call(this) || this;
        _this.max = 24;
        _this.min = 24;
        _this.speed = 1;
        _this.image = new egret.Bitmap();
        _this.direction = direction;
        _this.type = type;
        _this.initDoorsConfig();
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.drawRabbit, _this);
        return _this;
    }
    Rabbit.prototype.drawRabbit = function () {
        var direction = this.direction;
        this.x = this.directionConfig[direction].x;
        this.y = this.directionConfig[direction].y;
        this.width = this.directionConfig[direction].width;
        this.height = this.directionConfig[direction].height;
        this.addImage();
        // if(this.type){
        //     this.drawGood();
        // }else{
        //     this.drawBad();
        // }
    };
    //right_png
    Rabbit.prototype.addImage = function () {
        // let width,height;
        // this.image.texture = RES.getRes('right_json');
        // this.image.width = this.image.width/2;
        // this.image.height = this.image.height/2;
        // width = this.image.width;
        // height = this.image.height;
        // this.image.x = this.width/2 - this.image.width/2;
        // this.image.y = this.height/2 - this.image.height/1.5;
        // this.addChild(this.image);
        this.load(this.initMovieClip);
    };
    Rabbit.prototype.load = function (callback) {
        var count = 0;
        var self = this;
        var check = function () {
            count++;
            if (count == 2) {
                callback.call(self);
            }
        };
        var loader = new egret.URLLoader();
        loader.addEventListener(egret.Event.COMPLETE, function loadOver(e) {
            var loader = e.currentTarget;
            this._mcTexture = loader.data;
            check();
        }, this);
        loader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        var request = new egret.URLRequest("../resource/assets/right.png");
        loader.load(request);
        var loader = new egret.URLLoader();
        loader.addEventListener(egret.Event.COMPLETE, function loadOver(e) {
            var loader = e.currentTarget;
            this._mcData = JSON.parse(loader.data);
            check();
        }, this);
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        var request = new egret.URLRequest("../resource/assets/right.json");
        loader.load(request);
    };
    Rabbit.prototype.initMovieClip = function () {
        var mcDataFactory = new egret.MovieClipDataFactory(this._mcData, this._mcTexture);
        var role = new egret.MovieClip(mcDataFactory.generateMovieClipData("good"));
        role.scaleX = 2;
        role.scaleY = 2;
        role.frameRate = 6;
        this.addChild(role);
        role.gotoAndPlay(0, -1);
    };
    Rabbit.prototype.drawGood = function () {
        var back = this.back = new egret.Sprite();
        ;
        var direction = this.direction;
        back.graphics.beginFill(0xffcccc);
        back.graphics.drawRect(0, 0, this.width, this.height);
        back.graphics.endFill();
        this.addChild(back);
    };
    Rabbit.prototype.drawBad = function () {
        var back = this.back = new egret.Sprite();
        ;
        var direction = this.direction;
        back.graphics.beginFill(0x212121);
        back.graphics.drawRect(0, 0, this.width, this.height);
        back.graphics.endFill();
        this.addChild(back);
    };
    Rabbit.prototype.killAni = function () {
        this.back.graphics.beginfill(0xc00);
        this.back.graphics.endFill();
    };
    Rabbit.prototype.initDoorsConfig = function () {
        this.directionConfig = Config.initDoorsConfig(gameBody.relWidth, gameBody.relHeight, this.max, this.min);
    };
    return Rabbit;
}(egret.Sprite));
__reflect(Rabbit.prototype, "Rabbit");
//# sourceMappingURL=rabbit.js.map