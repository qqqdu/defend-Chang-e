var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Doors = (function (_super) {
    __extends(Doors, _super);
    function Doors(direction) {
        var _this = _super.call(this) || this;
        _this.min = 40;
        _this.max = 200;
        _this.direction = direction;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.drawDoors, _this);
        return _this;
    }
    Doors.prototype.initDoorsConfig = function () {
        this.directionConfig = [{
                x: gameBody.relWidth / 2 - this.max / 2,
                y: 0,
                width: this.max,
                height: this.min
            }, {
                x: gameBody.relWidth - this.min,
                y: gameBody.relHeight / 2 - this.max / 2,
                width: this.min,
                height: this.max
            }, {
                x: gameBody.relWidth / 2 - this.max / 2,
                y: gameBody.relHeight - this.min,
                width: this.max,
                height: this.min
            }, {
                x: 0,
                y: gameBody.relHeight / 2 - this.max / 2,
                width: this.min,
                height: this.max
            }];
    };
    Doors.prototype.drawDoors = function () {
        var back = new egret.Shape();
        var direction = this.direction;
        this.initDoorsConfig();
        back.graphics.beginFill(0xffcccc);
        back.graphics.drawRect(0, 0, this.directionConfig[direction].width, this.directionConfig[direction].height);
        back.graphics.endFill();
        this.x = this.directionConfig[direction].x;
        this.y = this.directionConfig[direction].y;
        this.addChild(back);
    };
    return Doors;
}(egret.Sprite));
__reflect(Doors.prototype, "Doors");
//# sourceMappingURL=doors.js.map