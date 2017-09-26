class Doors extends egret.Sprite{
    public min:number = 40;
    public max:number = 200;
    public directionConfig :Object;
    private direction:number;
    public constructor(direction){
        super();
        this.direction = direction;
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.drawDoors,this);
    }
    private initDoorsConfig(){
        this.directionConfig = Config.initDoorsConfig(gameBody.relWidth,gameBody.relHeight,this.max,this.min)
    }
    private drawDoors(){
        let back: egret.Shape = new egret.Shape();
        let direction = this.direction;
        this.initDoorsConfig();
        back.graphics.beginFill(0xffcccc,0);
        back.graphics.drawRect(0,0,this.directionConfig[direction].width,this.directionConfig[direction].height);
        back.graphics.endFill();
        this.x = this.directionConfig[direction].x;
        this.y = this.directionConfig[direction].y;
        this.addChild(back);
    }
}