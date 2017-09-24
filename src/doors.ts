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
        this.directionConfig = [{  //top right bottom left
            x : gameBody.relWidth/2-this.max/2,
            y : 0,
            width : this.max,
            height : this.min
        },{
            x : gameBody.relWidth - this.min,
            y : gameBody.relHeight/2-this.max/2,
            width : this.min,
            height : this.max
        },{
            x : gameBody.relWidth/2-this.max/2,
            y : gameBody.relHeight-this.min,
            width : this.max,
            height : this.min
        },{
            x : 0,
            y : gameBody.relHeight/2-this.max/2,
            width : this.min,
            height : this.max
        }];
    }
    private drawDoors(){
        let back: egret.Shape = new egret.Shape();
        let direction = this.direction;
        this.initDoorsConfig();
        back.graphics.beginFill(0xffcccc);
        back.graphics.drawRect(0,0,this.directionConfig[direction].width,this.directionConfig[direction].height);
        back.graphics.endFill();
        this.x = this.directionConfig[direction].x;
        this.y = this.directionConfig[direction].y;
        this.addChild(back);
    }
}