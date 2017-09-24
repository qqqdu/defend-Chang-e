class gameBody extends egret.Sprite{
    private shape: egret.Shape;
    private changE: Change;
    private doors: Array<Doors>;
    static relWidth: number;
    static relHeight: number;
    static listenObj: Array<any> = []; //listen clock function
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.begining,this);
    }
    
    private begining(){
        var back: egret.Shape = new egret.Sprite();
        back.graphics.beginFill(0x35414d);
        back.graphics.drawRect(0,0,this.stage.stageWidth,this.stage.stageWidth);
        back.graphics.endFill();
        back.touchEnabled = true;
        back.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTouch, this );
        gameBody.relWidth = gameBody.relHeight = 
        this.width  = this.height =  this.stage.stageWidth;
        this.addChild(back);
        this.addChange();
        this.addDoors();
        egret.startTick(this.onTicker, this);
        
    }
    private _time;
   
    private onTicker(timeStamp:number) {
            if(!this._time) {
                this._time = timeStamp;
            }
            var now = timeStamp;
            var pass = now - this._time;
            this._time = now;
            // gameBody.listenObj.map((item)=>{
            //     item['fun'].call(item['that']);
            // })
            return false;
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
    private onTouch(ev){
        let [x,y] = [ev.stageX,ev.stageY];
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
    
}