class Config{
    static cache :Object={};
    static initDoorsConfig(relWidth,relHeight,max,min){
        let save = `name${relWidth},${relHeight},${max},${min}`;
        if(Config.cache[save])
            return Config.cache[save];
        return Config.cache[save] = [{  //top right bottom left
            x : relWidth/2-max/2,
            y : 0,
            width : max,
            height : min
        },{
            x : relWidth - min,
            y : relHeight/2-max/2,
            width : min,
            height : max
        },{
            x : relWidth/2-max/2,
            y : relHeight+max,
            width : max,
            height : min
        },{
            x : 0,
            y : relHeight/2-max/2,
            width : min,
            height :max
        }];
    }
}