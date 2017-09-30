

class AudioHit extends egret.Sprite {
    private _pauseTime: number = 30;
    private _sound: egret.Sound;
    private _channel: egret.SoundChannel;

    private _aMusic : egret.Sound;

    private _waMusic : egret.Sound;

    constructor() {
        super();

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        this.loadSound();
    }

    /*** 本示例关键代码段开始 ***/
    //加载
    private loadSound(): void {
        if(this._sound)
            return;
        this._sound = new egret.Sound();;
        //sound 加载完成监听
        this._sound.load("resource/assets/hit.mp3");
        this._aMusic= new egret.Sound();
        this._aMusic.load("resource/assets/aaa.mp3");
        this._waMusic = new egret.Sound();
        this._waMusic.load("resource/assets/wa.mp3")
    }
    //播放
    public play():void {
        //sound 播放会返回一个 SoundChannel 对象，暂停、音量等操作请控制此对象
        console.log('play')
        this._channel = this._sound.play(0, 1);
        this._channel.volume=1;
    }
    public playAMucis(){
        this._aMusic.play(0,1);
    }
    public playwaMucis(){
        this._waMusic.play(0,1);
    }
    //停止
    private stop():void {
        if (this._channel) {
            this._channel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onComplete, this);
            this._channel.stop();
            this._channel = null;
        }
    }
    //播放完成
    private onComplete(e:egret.Event):void {
        console.log("播放完成");
        this.stop();
    }
  
    
 
    
    /*** 本示例关键代码段结束 ***/
    

   
  
}