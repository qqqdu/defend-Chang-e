class gameInf extends egret.Sprite{
    private hearts;
    private scores;
    private HTMLPAGE;
    private timer;
    public constructor(){
        super();
        this.addHTML();
        this.hearts = document.querySelectorAll('.hearts span');
        this.scores = document.querySelector('.score .num')
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
        this.timerFn();
    }
    public initInf(){
        this.timerFn();
        document.querySelector('.hearts').innerHTML =  `<span class="heart"></span>
                                                        <span class="heart"></span>
                                                        <span class="heart"></span>`;
         document.querySelector('.score .num').innerHTML = '0';  
         document.querySelector('.score .time').innerHTML = '42';   
         this.hearts = document.querySelectorAll('.hearts span'); 
    }
    private timerFn(){
        let i = 0;
        clearInterval(this.timer);
        this.timer = setInterval(()=>{
            if(!State.gameBegin)
                clearInterval(this.timer);
            document.querySelector('.score .time').innerHTML = i.toString(); 
            i++;
        },1000);
    }
    public reduceLife(){
        console.log(State.life);
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