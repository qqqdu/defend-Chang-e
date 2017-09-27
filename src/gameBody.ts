class gameBody extends egret.Sprite{
    private shape: egret.Shape;
    private changE: Change;
    private doors: Array<Doors>;
    private duration : number = 1000;
    private timer : egret.Timer;
    private back : any;
    private LoadingMusic:LoadingMusic;
    private gameInf:gameInf;
    private rabbits: Array<Rabbit>= [];
    private audioHit:AudioHit;
    private lockCommon:number;
    
    static relWidth: number;
    static relHeight: number;
    static listenObj: Array<any> = []; //listen clock function
    static topSet:number;
    public constructor() {
        super();
        //this.addEventListener(egret.Event.ADDED_TO_STAGE,this.begining,this);
    }
    
    private begining(){
        
        gameBody.relWidth = gameBody.relHeight = 
        this.width  = this.height =  this.stage.stageWidth;
        //this.y = gameBody.topSet= this.stage.stageHeight-this.height;
        this.y = 240;
        this.audioHit = new AudioHit();
        this.gameInf = new gameInf();
        this.LoadingMusic = new LoadingMusic();
        this.addChild(this.gameInf);
        this.addChild(this.audioHit);
        this.drawBack();
        this.addChange();
        this.addDoors();
        this.beginGame();
        State.gameBegin = true;
        egret.startTick(this.onTicker, this);
    }
    private drawBack(){
        let back = this.back =  new egret.Sprite();
        back.graphics.beginFill(0x35414d,0);
        back.graphics.drawRect(0,0,this.stage.stageWidth,this.stage.stageWidth);
        back.graphics.endFill();
        back.touchEnabled = true;
        back.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTouch, this );
        this.addChild(back);
    }
    private addChange(){
        this.changE = new Change();
        this.addChild(this.changE);
    }
    private addDoors(){
        this.doors = [];
        for(let i = 0;i<4;i++){
            this.addChild(new Doors(i));
        }
    }
    private beginGame(){
        this.beginTimer();
    }
    private beginTimer(){
        // this.timer = new egret.Timer(this.duration,0);
        // this.timer.addEventListener(egret.TimerEvent.TIMER,this.addRabbit,this);
        // this.timer.start();
        // this.addEventListener(egret.TimerEvent.TIMER_COMPLETE,function(){
        // }, this);
        this.LoadingMusic.callback = ()=>{
            this.addRabbit();
        }
    }
    private addRabbit(){
        let direction = Math.floor(Math.random()*4);
        let type = Math.random()>0.8?true:false;
        let rabbit = null;
        if(this.lockCommon===direction){  // last num is this one
            this.addRabbit();
            return false;
        }
        rabbit = new Rabbit(direction,type);
        this.lockCommon = direction;
        this.rabbits.push(rabbit);
        this.addChild(rabbit);
    }
    private moveRabbit(){
        this.rabbits.map((rabbit)=>{
                this.moveMe(rabbit);
        })
        this.rabbits.forEach((rabbit,index)=>{
                this.checkHit(rabbit,index);
        })
    }
    public moveMe(rabbit){
        if(!rabbit.life) //rabbit was died
            return;
        switch(rabbit.direction){
            case 0:
                rabbit.y+=rabbit.speed;
                break;
            case 1:
                rabbit.x-=rabbit.speed;
                break;
            case 2:
                rabbit.y-=rabbit.speed;
                break;
            default:
                rabbit.x+=rabbit.speed;
                break;
        }
    }
    private checkHit(obj,index){
        let hitTestFun =hitTest.hitTest.hitTest;
        let checkHitFun = hitTest.hitTest.checkHit;
        this.changE.cakes.forEach((cake,cIndex)=>{
         
            if(checkHitFun(obj,cake)){ //cake hit rabbit
                this.rabbitKilled(obj,index,true);
                this.changE.cakeKilled(cake,cIndex);
            }
        });
        
        if(hitTestFun(obj,this.changE)){ //hit chang'e
            this.rabbitKilled(obj,index,false);
        }
        return;
    }
    private rabbitKilled(obj,index,who){  //if who is true 
        
        if(obj.type){ //right
            who?this.gameInf.reduceLife():this.gameInf.addScore();
        }else{
            who?this.gameInf.addScore():this.gameInf.reduceLife();
            if(State.life===0){
                this.gameOver();
                return;
            }
        }
        this.audioHit.play();
        obj.killAni(()=>{
            if(obj.parent)
                this.removeChild(obj);
        })
        this.rabbits.splice(index,1);
    }
    private gameOver(){
        State.gameBegin = false;
        this.removeChildren();
        this.rabbits.length = 0;
    }
    private onTouch(ev){
        let [x,y] = [ev.stageX,ev.stageY-this.y];
        let [width,height] = [gameBody.relWidth,gameBody.relHeight];
        let result;
        if(x>y){
            if(width-y>x){
                result = 0;
            }
            if(width-y<=x){
                result = 1;
            }
        }else{
            if(height-x>y){
                result = 3;
            }
            if(height-x<=y){
                result = 2;
            }
        }
        this.changE.direction = result;
        this.changE.shootCake();
    }
    private _time;
   
    private onTicker(timeStamp:number) {
            if(!this._time) {
                this._time = timeStamp;
            }
            var now = timeStamp;
            var pass = now - this._time;
            this._time = now;
            this.moveRabbit();
            return false;
    } 
}