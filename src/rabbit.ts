class Rabbit extends egret.Sprite{
    public max:number = 24;
    public min:number = 24;
    public direction:number;
    public back:any;
    public parent:Change;
    public directionConfig;
    public speed=2;
    public type; //true is good rabbit else bad
    public life:Boolean =true;
    private _mcData;
    private _mcTexture;
    private audioHit:AudioHit;
     
    private configType = {
        "bad" : {
            json : "badL.json",
            png : "badL.png",
        },
        "good" : {
            json : "goodL.json",
            png : "goodL.png"
        }
    };
    private JSONS:String;
    private PNGS :String;
    public constructor(direction,type){
        super();
        this.direction = direction;
        this.type = type;
        if(this.type){
            [this.JSONS,this.PNGS] = [this.configType["good"].json,this.configType["good"].png];
        }else{
            [this.JSONS,this.PNGS] = [this.configType["bad"].json,this.configType["bad"].png];
        }
        this.initDoorsConfig();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.drawRabbit,this);
    }
    private drawRabbit(){
        let direction = this.direction;
        this.x = this.directionConfig[direction].x+10;
        this.y = this.directionConfig[direction].y;
        this.width = this.directionConfig[direction].width;
        this.height = this.directionConfig[direction].height;
        this.addImage();
    }
    //right_png
    private addImage(){
        this.load(this.initMovieClip);
    }
    private load(callback:Function):void {
        var count:number = 0;
        var self = this;
        var check = function () {
            count++;
            if (count == 2) {
                callback.call(self);
            }
        }
        
        var loader = new egret.URLLoader();
        loader.addEventListener(egret.Event.COMPLETE, function loadOver(e) {
            var loader = e.currentTarget;

            this._mcTexture = loader.data;
            
            check();
        }, this);
        loader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        var request = new egret.URLRequest("./resource/assets/"+this.PNGS);
        loader.load(request);
        
        var loader = new egret.URLLoader();
        loader.addEventListener(egret.Event.COMPLETE, function loadOver(e) {
            var loader = e.currentTarget;

            this._mcData = JSON.parse(loader.data);
            
            check();
        }, this);
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        var request = new egret.URLRequest("./resource/assets/"+this.JSONS);
        loader.load(request);
    }
    private initMovieClip():void {
        var mcDataFactory = new egret.MovieClipDataFactory(this._mcData, this._mcTexture);
        var role:egret.MovieClip;
        role =  new egret.MovieClip(mcDataFactory.generateMovieClipData("move"));
        role.scaleX = .25;
        role.scaleY = .25;
        role.x = 0;
        role.y = 0;
        role.width = this.width;
        role.height = this.height;
        if(!this.type&&this.direction===3)
            role.skewY = 180;
        if(this.type&&this.direction===1)
            role.skewY = 180;
        role.frameRate = 6;
        this.addChild(role);
        role.gotoAndPlay(0,-1);
    }
 
    private killAni(callback){
        this.life = false;
        setTimeout(function(){
            callback&&callback();
        },300)
        
    }
    private initDoorsConfig(){
        this.directionConfig = Config.initDoorsConfig(gameBody.relWidth,gameBody.relHeight,this.max,this.min)
    }
    
}