class gameInf extends egret.Sprite{
    private hearts;
    private scores;
    private HTMLPAGE;
    public constructor(){
        super();
        this.addHTML();
        this.hearts = document.querySelectorAll('.hearts span');
        this.scores = document.querySelector('.score .num')
        //this.addEventListener(egret.Event.ADDED_TO_STAGE,this.drawCake,this);
    }
    private addHTML(){
        this.HTMLPAGE = `<div class="score">
                            <li>
                                <div>
                                    <span>生命值：</span>
                                </div>
                                <div class="hearts">
                                    <span class="heart"></span>
                                    <span class="heart"></span>
                                    <span class="heart"></span>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <span>分数：</span>
                                    <span class="num">0</span>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <span>时间：</span>
                                    <span class="time">0</span>
                                </div>
                            </li>
                        </div>`;
        let frag = document.createElement("div");
        frag.innerHTML = this.HTMLPAGE;
        document.querySelector('body').appendChild(frag);
    }
    private drawCake(){
        var back: egret.Shape = new egret.Sprite();
        back.graphics.beginFill(0x1f1f1f,0);
        back.graphics.drawRect(0,0,this.stage.stageWidth,this.height);
        back.graphics.endFill();
        this.x  = 0;
         this.y = 0;
        this.width = this.stage.stageWidth;
        this.addChild(back);
    }
    public reduceLife(){
        if(State.life===0)
            return;
        State.life--;
        this.hearts[State.life].setAttribute('class','heartDed');
    }
    public addScore(){
        State.score++;
        this.scores.innerHTML =State.score.toString();
    }
}