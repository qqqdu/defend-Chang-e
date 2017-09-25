class Rabbit extends egret.Sprite{
    public max:number = 24;
    public min:number = 24;
    public direction:number;
    public back:any;
    public parent:Change;
    public directionConfig;
    public speed=1;
    public type; //true is good rabbit else bad
    private image:egret.Bitmap = new egret.Bitmap();
    private _mcData;
    private _mcTexture;
    public constructor(direction,type){
        super();
        this.direction = direction;
        this.type = type;
        this.initDoorsConfig();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.drawRabbit,this);
    }
    private drawRabbit(){
        let direction = this.direction;
        this.x = this.directionConfig[direction].x;
        this.y = this.directionConfig[direction].y;
        this.width = this.directionConfig[direction].width;
        this.height = this.directionConfig[direction].height;
        this.addImage();
        // if(this.type){
        //     this.drawGood();
        // }else{
        //     this.drawBad();
        // }
    }
    //right_png
    private addImage(){
        // let width,height;
        // this.image.texture = RES.getRes('right_json');
        // this.image.width = this.image.width/2;
        // this.image.height = this.image.height/2;
        // width = this.image.width;
        // height = this.image.height;
        // this.image.x = this.width/2 - this.image.width/2;
        // this.image.y = this.height/2 - this.image.height/1.5;
        // this.addChild(this.image);
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
        var request = new egret.URLRequest("../resource/assets/right.png");
        loader.load(request);
        
        var loader = new egret.URLLoader();
        loader.addEventListener(egret.Event.COMPLETE, function loadOver(e) {
            var loader = e.currentTarget;

            this._mcData = JSON.parse(loader.data);
            
            check();
        }, this);
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        var request = new egret.URLRequest("../resource/assets/right.json");
        loader.load(request);
    }
    private initMovieClip():void {
        var mcDataFactory = new egret.MovieClipDataFactory(this._mcData, this._mcTexture);
        var role:egret.MovieClip = new egret.MovieClip(mcDataFactory.generateMovieClipData("good"));
        role.scaleX = 2;
        role.scaleY = 2;
        role.frameRate = 6;
        this.addChild(role);
        role.gotoAndPlay(0,-1);
      
    }
    private drawGood(){
        let back = this.back = new egret.Sprite();;
        let direction = this.direction;
        back.graphics.beginFill(0xffcccc);
        back.graphics.drawRect(0,0,this.width,this.height);
        back.graphics.endFill();
        this.addChild(back);
    }
    private drawBad(){
        let back = this.back = new egret.Sprite();;
        let direction = this.direction;
        back.graphics.beginFill(0x212121); 
        back.graphics.drawRect(0,0,this.width,this.height);
        back.graphics.endFill();
        this.addChild(back);
    }
    private killAni(){
        this.back.graphics.beginfill(0xc00);
        this.back.graphics.endFill();
    }
    private initDoorsConfig(){
        this.directionConfig = Config.initDoorsConfig(gameBody.relWidth,gameBody.relHeight,this.max,this.min)
    }
    
}