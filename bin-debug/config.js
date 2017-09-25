var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config = (function () {
    function Config() {
    }
    Config.initDoorsConfig = function (relWidth, relHeight, max, min) {
        var save = "name" + relWidth + "," + relHeight + "," + max + "," + min;
        if (Config.cache[save])
            return Config.cache[save];
        return Config.cache[save] = [{
                x: relWidth / 2 - max / 2,
                y: 0,
                width: max,
                height: min
            }, {
                x: relWidth - min,
                y: relHeight / 2 - max / 2,
                width: min,
                height: max
            }, {
                x: relWidth / 2 - max / 2,
                y: relHeight - min,
                width: max,
                height: min
            }, {
                x: 0,
                y: relHeight / 2 - max / 2,
                width: min,
                height: max
            }];
    };
    return Config;
}());
Config.cache = {};
__reflect(Config.prototype, "Config");
//# sourceMappingURL=config.js.map