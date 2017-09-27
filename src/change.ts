class Change extends egret.Sprite{
    public width:number = 102;
    public height:number = 115;
    public score:number= 0;
    public hitRabbit = 0;
    public direction = 0;
    public cakes : Array<Cake> = [];
    private speed:number = 10;
    private image:egret.Bitmap = new egret.Bitmap();
    private PNGS='changE.png'; 
    private JSONS='changE.json';
    private _mcData;
    private _mcTexture;
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.drawChange,this);
        egret.startTick(this.onTicker, this);
    }
    private drawChange(){
        var back: egret.Shape = new egret.Shape();
        back.graphics.beginFill(0xffcccc);
        back.graphics.drawRect(0,0,this.width,this.height);
        back.graphics.endFill();
        this.x  = gameBody.relWidth/2-this.width/2;
        this.y = gameBody.relHeight/2-this.height/2;
        //this.addChild(back);
        this.addImage();
    }
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
        var request = new egret.URLRequest("./resource/assets/"+self.PNGS);
        loader.load(request);
        
        var loader = new egret.URLLoader();
        loader.addEventListener(egret.Event.COMPLETE, function loadOver(e) {
            var loader = e.currentTarget;

            this._mcData = JSON.parse(loader.data);
            
            check();
        }, this);
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        var request = new egret.URLRequest("./resource/assets/"+self.JSONS);
        loader.load(request);
    }
    private initMovieClip():void {
        var mcDataFactory = new egret.MovieClipDataFactory(this._mcData, this._mcTexture);
        var role:egret.MovieClip;
        role =  new egret.MovieClip(mcDataFactory.generateMovieClipData("change"));
        
        role.x = 0;
        role.y = 0;
        role.scaleX = .5;
        role.scaleY = .5;
        role.frameRate = 5;
        this.addChild(role);
        role.gotoAndPlay(0,-1);
    }
    private _time;
    private onTicker(timeStamp:number) {
            if(!this._time) {
                this._time = timeStamp;
            }
            var now = timeStamp;
            var pass = now - this._time;
            this._time = now;
            this.moveShoot();
            return false;
    }
    public shootCake(){ // add shoots
        let cake = new Cake(this.direction,this);
        this.addChild(cake);
        this.cakes.push(cake);

    }
    public moveShoot(){
        this.cakes.forEach((obj,index)=>{
            this.moveCake(obj);
        })
        this.cakes.forEach((obj,index)=>{
            this.checkHit(obj,index);
        })
    }

    public moveCake(obj){
        switch(obj.direction){
            case 0:
                obj.y-=this.speed;
                break;
            case 1:
                obj.x+=this.speed;
                break;
            case 2:
                obj.y+=this.speed;
                break;
            default:
                obj.x-=this.speed;
                break;
        }
    }
    private checkHit(obj,index){
        let globel = obj.localToGlobal();
        globel.y-=gameBody.topSet;
        if(globel.x<0||globel.y<0||globel.x>gameBody.relWidth||globel.y>gameBody.relHeight){
            this.cakeKilled(obj,index);
        }
        return true;
    }
    public cakeKilled(obj,index){
        this.removeChild(obj);
        this.cakes.splice(index,1);
    }

}