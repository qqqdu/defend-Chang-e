class backGround extends egret.Sprite{
    private image = new egret.Bitmap();
    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addBack,this);
    }
    private addBack (){
        let width,height;
        this.image.texture = RES.getRes('back_PNG');
        this.image.width = this.stage.stageWidth;
        this.image.height = this.stage.stageHeight;
        this.image.x =0;
        this.image.y = 0;
        this.addChild(this.image);
    }
}