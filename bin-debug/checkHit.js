var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var hitTest;
(function (hitTest_1) {
    var hitTest = (function () {
        function hitTest() {
        }
        hitTest.hitTest = function (obj1, obj2) {
            var rect_1 = obj1.getBounds();
            var rect_2 = obj2.getBounds();
            rect_1.x = obj1.x;
            rect_1.y = obj1.y;
            rect_1.width = obj1.width;
            rect_1.height = obj1.height;
            rect_2.x = obj2.x;
            rect_2.y = obj2.y;
            rect_2.width = obj2.width;
            rect_2.height = obj2.height;
            return rect_1.intersects(rect_2);
        };
        hitTest.checkHit = function (obj1, obj2) {
            var _a = [obj1.localToGlobal().x, obj1.localToGlobal().y, obj1.width, obj1.height,
                obj2.localToGlobal().x, obj2.localToGlobal().y, obj2.width, obj2.height,], x1 = _a[0], y1 = _a[1], w1 = _a[2], h1 = _a[3], x2 = _a[4], y2 = _a[5], w2 = _a[6], h2 = _a[7];
            if (x1 >= x2 && x1 >= x2 + w2) {
                return false;
            }
            else if (x1 <= x2 && x1 + w1 <= x2) {
                return false;
            }
            else if (y1 >= y2 && y1 >= y2 + h2) {
                return false;
            }
            else if (y1 <= y2 && y1 + h1 <= y2) {
                return false;
            }
            return true;
        };
        return hitTest;
    }());
    hitTest_1.hitTest = hitTest;
    __reflect(hitTest.prototype, "hitTest.hitTest");
})(hitTest || (hitTest = {}));
//# sourceMappingURL=checkHit.js.map