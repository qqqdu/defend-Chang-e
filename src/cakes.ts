class Cake extends egret.Sprite{
    public width:number = 30;
    public height:number = 30;
    public direction:number;
    public parent:Change;
    public text;
    private image:egret.Bitmap = new egret.Bitmap();
    public constructor(direction,parent){
        super();
        this.direction = direction;
        this.parent = parent;
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.drawCake,this);
    }
    private drawCake(){
        var back: egret.Shape = new egret.Sprite();
        back.graphics.beginFill(0xffcccc);
        back.graphics.drawRect(0,0,this.width,this.height);
        back.graphics.endFill();
        this.x  = this.parent.width/2-this.width/2;
        this.y = this.parent.width/2-this.height/2;
        //this.addChild(back);\
        this.addImage();
    }
    private addImage(){
        let width,height;
        this.image.texture = RES.getRes('cake_PNG');
        this.image.width = this.width;
        this.image.height = this.height;
        this.image.x = 0;
        this.image.y =  0;
        this.addChild(this.image);
    }
}