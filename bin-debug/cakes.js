var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Cake = (function (_super) {
    __extends(Cake, _super);
    function Cake(direction, parent) {
        var _this = _super.call(this) || this;
        _this.width = 10;
        _this.height = 10;
        _this.direction = direction;
        _this.parent = parent;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.drawCake, _this);
        return _this;
    }
    Cake.prototype.drawCake = function () {
        var back = new egret.Sprite();
        back.graphics.beginFill(0xffcccc);
        back.graphics.drawRect(0, 0, this.width, this.height);
        back.graphics.endFill();
        this.x = this.parent.width / 2 - this.width / 2;
        this.y = this.parent.width / 2 - this.height / 2;
        this.addChild(back);
    };
    return Cake;
}(egret.Sprite));
__reflect(Cake.prototype, "Cake");
//# sourceMappingURL=cakes.js.map