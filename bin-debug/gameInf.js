var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var gameInf = (function (_super) {
    __extends(gameInf, _super);
    function gameInf() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.drawCake, _this);
        return _this;
    }
    gameInf.prototype.drawCake = function () {
        var back = new egret.Sprite();
        back.graphics.beginFill(0xffcccc);
        back.graphics.drawRect(0, 0, this.stage.stageWidth, gameBody.relHeight / 2);
        back.graphics.endFill();
        this.x = 0;
        this.y = 0;
        this.addChild(back);
    };
    return gameInf;
}(egret.Sprite));
__reflect(gameInf.prototype, "gameInf");
//# sourceMappingURL=gameInf.js.map