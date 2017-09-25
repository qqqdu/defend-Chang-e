var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Rabbit = (function (_super) {
    __extends(Rabbit, _super);
    function Rabbit(direction, type) {
        var _this = _super.call(this) || this;
        _this.max = 24;
        _this.min = 24;
        _this.speed = 5;
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
        if (this.type) {
            this.drawGood();
        }
        else {
            this.drawBad();
        }
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