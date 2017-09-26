class gameInf extends egret.Sprite{
    public width:number;
    public height:number;
    public direction:number;
    public parent:Change;
    public text;
    public constructor(){
        super();
        
    //    this.addEventListener(egret.Event.ADDED_TO_STAGE,this.drawCake,this);
    }
    private drawCake(){
        var back: egret.Shape = new egret.Sprite();
        back.graphics.beginFill(0xffcccc);
        back.graphics.drawRect(0,0,this.stage.stageWidth,gameBody.relHeight/2);
        back.graphics.endFill();
        this.x  = 0;
        this.y = 0;
        this.addChild(back);
    }
}