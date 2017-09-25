class Change extends egret.Sprite{
    public width:number = 50;
    public height:number = 50;
    public life = 1; //是否存活
    public hitRabbit = 0;
    public direction = 0;
    public cakes : Array<Cake> = [];
    private speed:number = 10;
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
        this.addChild(back);
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