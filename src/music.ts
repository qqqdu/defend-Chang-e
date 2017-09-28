//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
const url = './resource/assets/music.mp3';

class LoadingMusic extends egret.Sprite {
    private buffer:Object;
    private audio;
    private analyser;
    public callback:Function;
    public constructor() {
        super();  
        window["AudioContext"] = window["AudioContext"] || window["webkitAudioContext"] || window["mozAudioContext"] || window["msAudioContext"];
        this.audio =  new window["AudioContext"]();
        this.loadMusic();
    }
    private createMusic():void {
       
    }
    private loadMusic(){
        let request = new XMLHttpRequest(); //建立一个请求
        let that = this;
        let audio =this.audio;
        request.open('GET', url, true); //配置好请求类型，文件路径等
        request.responseType = 'arraybuffer'; //配置数据返回类型
        // 一旦获取完成，对音频进行进一步操作，比如解码
        request.onload = function() {
            // that.buffer = request.response;
            console.log( request.response);
            audio.decodeAudioData(request.response,function(buffer){
                that.analyser = audio.createAnalyser();
                var audioBufferSouceNode = audio.createBufferSource();
                audioBufferSouceNode.buffer = buffer;
                audioBufferSouceNode.connect(that.analyser);  //获取频谱
                that.analyser.connect(audio.destination);  //链接喇叭
                audioBufferSouceNode.start(0);
                that.parseMusic();
                setInterval(function(){
                    if(!State.gameBegin){
                        audioBufferSouceNode.stop();
                        return false;
                    }
			    	that.parseMusic();
			    },500);
            })
        }
        request.send();
    }
    private parseMusic(){
        let array = new Uint8Array(this.analyser.frequencyBinCount);
    	let val;
        let num = 0;
		this.analyser.getByteFrequencyData(array);
        
		
         for(let i = 0;i<array.length;i++){
		 	val = array[i];
		 	if(val>210){
		 			this.callback&&this.callback();
			}
		 }
		 if(num>6){
		 	
		 }

    }
}
