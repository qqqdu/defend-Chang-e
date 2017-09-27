class Doors extends egret.Sprite{
    public min:number = 40;
    public max:number = 200;
    public directionConfig :Object;
    private direction:number;
    private image:egret.Bitmap = new egret.Bitmap();
    private doorSrcArr:Array<String> = ['top','right','botto','left'];
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
        this.addImage();
    }
    private addImage(){
        let width,height;
        let direction;
        this.image.texture = RES.getRes('doors_json.'+this.doorSrcArr[this.direction]);
        this.image.width *=1.5;
        this.image.height *=1.5;
        this.image.x = this.width/2 - this.image.width/3;
        this.image.y = this.height/2 - this.image.height/3;
        this.addChild(this.image);
    }
}