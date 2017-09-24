var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Change = (function (_super) {
    __extends(Change, _super);
    function Change() {
        var _this = _super.call(this) || this;
        _this.width = 50;
        _this.height = 50;
        _this.life = 1; //是否存活
        _this.hitRabbit = 0;
        _this.direction = 0;
        _this.cakes = [];
        _this.speed = 5;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.drawChange, _this);
        egret.startTick(_this.onTicker, _this);
        return _this;
    }
    Change.prototype.drawChange = function () {
        var back = new egret.Shape();
        back.graphics.beginFill(0xffcccc);
        back.graphics.drawRect(0, 0, this.width, this.height);
        back.graphics.endFill();
        this.x = gameBody.relWidth / 2 - this.width / 2;
        this.y = gameBody.relHeight / 2 - this.height / 2;
        this.addChild(back);
    };
    Change.prototype.onTicker = function (timeStamp) {
        if (!this._time) {
            this._time = timeStamp;
        }
        var now = timeStamp;
        var pass = now - this._time;
        this._time = now;
        // gameBody.listenObj.map((item)=>{
        //     item['fun'].call(item['that']);
        // })
        this.moveShoot();
        return false;
    };
    Change.prototype.shootCake = function () {
        var cake = new Cake(this.direction, this);
        this.addChild(cake);
        this.cakes.push(cake);
        // console.log(this.cakes.length);
        // gameBody.listenObj.push({
        //     fun : this.moveShoot,
        //     that : this
        // });
    };
    Change.prototype.moveShoot = function () {
        var _this = this;
        this.cakes.forEach(function (obj, index) {
            _this.moveCake(obj);
        });
        this.cakes.forEach(function (obj, index) {
            _this.checkHit(obj, index);
        });
    };
    Change.prototype.moveCake = function (obj) {
        switch (obj.direction) {
            case 0:
                obj.y -= this.speed;
                break;
            case 1:
                obj.x += this.speed;
                break;
            case 2:
                obj.y += this.speed;
                break;
            default:
                obj.x -= this.speed;
                break;
        }
    };
    Change.prototype.checkHit = function (obj, index) {
        var globel = obj.localToGlobal();
        if (globel.x < 0 || globel.y < 0 || globel.x > gameBody.relWidth || globel.y > gameBody.relHeight) {
            this.removeChild(obj);
            this.cakes.splice(index, 1);
        }
        return true;
    };
    return Change;
}(egret.Sprite));
__reflect(Change.prototype, "Change");
//# sourceMappingURL=change.js.map