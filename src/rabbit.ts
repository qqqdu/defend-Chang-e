class Rabbit extends egret.Sprite{
    public max:number = 24;
    public min:number = 24;
    public direction:number;
    public back:any;
    public parent:Change;
    public directionConfig;
    public speed=5;
    public type; //true is good rabbit else bad
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
        if(this.type){
            this.drawGood();
        }else{
            this.drawBad();
        }
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