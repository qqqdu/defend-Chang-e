var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var gameBody = (function (_super) {
    __extends(gameBody, _super);
    function gameBody() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.begining, _this);
        return _this;
    }
    gameBody.prototype.begining = function () {
        var back = new egret.Sprite();
        back.graphics.beginFill(0x35414d);
        back.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageWidth);
        back.graphics.endFill();
        back.touchEnabled = true;
        back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        gameBody.relWidth = gameBody.relHeight =
            this.width = this.height = this.stage.stageWidth;
        this.addChild(back);
        this.addChange();
        this.addDoors();
        egret.startTick(this.onTicker, this);
    };
    gameBody.prototype.onTicker = function (timeStamp) {
        if (!this._time) {
            this._time = timeStamp;
        }
        var now = timeStamp;
        var pass = now - this._time;
        this._time = now;
        // gameBody.listenObj.map((item)=>{
        //     item['fun'].call(item['that']);
        // })
        return false;
    };
    gameBody.prototype.addChange = function () {
        this.changE = new Change();
        this.addChild(this.changE);
    };
    gameBody.prototype.addDoors = function () {
        this.doors = [];
        for (var i = 0; i < 4; i++) {
            this.addChild(new Doors(i));
        }
    };
    gameBody.prototype.onTouch = function (ev) {
        var _a = [ev.stageX, ev.stageY], x = _a[0], y = _a[1];
        var _b = [gameBody.relWidth, gameBody.relHeight], width = _b[0], height = _b[1];
        var result;
        if (x > y) {
            if (width - y > x) {
                result = 0;
            }
            if (width - y <= x) {
                result = 1;
            }
        }
        else {
            if (height - x > y) {
                result = 3;
            }
            if (height - x <= y) {
                result = 2;
            }
        }
        this.changE.direction = result;
        this.changE.shootCake();
    };
    return gameBody;
}(egret.Sprite));
gameBody.listenObj = []; //listen clock function
__reflect(gameBody.prototype, "gameBody");
//# sourceMappingURL=gameBody.js.map