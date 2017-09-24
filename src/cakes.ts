class Cake extends egret.Sprite{
    public width:number = 10;
    public height:number = 10;
    public direction:number;
    public parent:Change;
    public constructor(direction,parent){
        super();
        this.direction = direction;
        this.parent = parent;
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.drawCake,this);
    }
    private drawCake(){
        var back: egret.Shape = new egret.Shape();
        back.graphics.beginFill(0xffcccc);
        back.graphics.drawRect(0,0,this.width,this.height);
        back.graphics.endFill();
        this.x  = this.parent.width/2-this.width/2;
        this.y = this.parent.width/2-this.height/2;
        console.log(this.x,this.y);
        this.addChild(back);
        
    }
}