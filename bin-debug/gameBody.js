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
        _this.duration = 1000;
        _this.rabbits = [];
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.begining, _this);
        return _this;
    }
    gameBody.prototype.begining = function () {
        gameBody.relWidth = gameBody.relHeight =
            this.width = this.height = this.stage.stageWidth;
        this.y = gameBody.topSet = this.stage.stageHeight - this.height;
        this.drawBack();
        this.addChange();
        this.addDoors();
        this.beginGame();
        egret.startTick(this.onTicker, this);
    };
    gameBody.prototype.drawBack = function () {
        var back = this.back = new egret.Sprite();
        back.graphics.beginFill(0x35414d);
        back.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageWidth);
        back.graphics.endFill();
        back.touchEnabled = true;
        back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.addChild(back);
    };
    gameBody.prototype.biliBack = function () {
        var _this = this;
        this.back.graphics.beginFill(0x212121);
        this.back.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageWidth);
        this.back.graphics.endFill();
        var timer = setTimeout(function () {
            _this.drawBack();
            clearTimeout(timer);
        }, 500);
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
    gameBody.prototype.beginGame = function () {
        this.beginTimer();
    };
    gameBody.prototype.beginTimer = function () {
        this.timer = new egret.Timer(this.duration, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.addRabbit, this);
        this.timer.start();
        this.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function () {
        }, this);
    };
    gameBody.prototype.addRabbit = function () {
        var direction = Math.floor(Math.random() * 4);
        var type = Math.random() > 0.8 ? true : false;
        var rabbit = new Rabbit(direction, type);
        this.rabbits.push(rabbit);
        this.addChild(rabbit);
    };
    gameBody.prototype.moveRabbit = function () {
        var _this = this;
        this.rabbits.map(function (rabbit) {
            _this.moveMe(rabbit);
        });
        this.rabbits.forEach(function (rabbit, index) {
            _this.checkHit(rabbit, index);
        });
    };
    gameBody.prototype.moveMe = function (rabbit) {
        switch (rabbit.direction) {
            case 0:
                rabbit.y += rabbit.speed;
                break;
            case 1:
                rabbit.x -= rabbit.speed;
                break;
            case 2:
                rabbit.y -= rabbit.speed;
                break;
            default:
                rabbit.x += rabbit.speed;
                break;
        }
    };
    gameBody.prototype.checkHit = function (obj, index) {
        var _this = this;
        var hitTestFun = hitTest.hitTest.hitTest;
        var checkHitFun = hitTest.hitTest.checkHit;
        this.changE.cakes.forEach(function (cake, cIndex) {
            if (checkHitFun(obj, cake)) {
                _this.rabbitKilled(obj, index);
                _this.changE.cakeKilled(cake, cIndex);
            }
        });
        if (hitTestFun(obj, this.changE)) {
            this.rabbitKilled(obj, index);
        }
        return;
    };
    gameBody.prototype.rabbitKilled = function (obj, index) {
        if (!obj)
            return;
        this.removeChild(obj);
        this.rabbits.splice(index, 1);
    };
    gameBody.prototype.onTouch = function (ev) {
        var _a = [ev.stageX, ev.stageY - this.y], x = _a[0], y = _a[1];
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
    gameBody.prototype.onTicker = function (timeStamp) {
        if (!this._time) {
            this._time = timeStamp;
        }
        var now = timeStamp;
        var pass = now - this._time;
        this._time = now;
        this.moveRabbit();
        return false;
    };
    return gameBody;
}(egret.Sprite));
gameBody.listenObj = []; //listen clock function
__reflect(gameBody.prototype, "gameBody");
//# sourceMappingURL=gameBody.js.map