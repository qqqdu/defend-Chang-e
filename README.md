# defend-Chang-e
白鹭引擎 H5小游戏 中秋节 保护嫦娥
之前接触白鹭引擎一个月，但因为种种原因没接着往下搞。  
中秋将至，这几天又想写一款简单的《保护嫦娥》的游戏。和学美工的同学合作。  
## 项目计划：  
开发人员：杜浩    
美工：吕伯程    
### 背景描述：  
中秋将至，月球上的兔子们听说嫦娥发月饼吃，纷纷来讨要，白兔们是嫦娥的好闺蜜，   
嫦娥当然要温柔的将月饼递在它们手里，可黑兔就不一样了，它们无恶不作，平日里，    
总欺负善良单纯的白兔们，还把月亮咬的坑坑洼洼的，嫦娥当然不乐意。用月饼把它    
们击退吧！！！  
### 游戏描述：  
背景： 广寒宫内  
人物： 嫦娥 白兔 黑兔  
物品： 好吃的月饼  
玩法： 点击不同角度，发射月饼击退黑兔，白兔不能击退哦，让白兔来嫦娥这里领月饼。  
奖励： 嫦娥的一个吻。  
### 制作周期：  
2017/9/24~2017/9/30

## 技术难点：
虽然这个游戏逻辑很简单，但在进行开发的过程中，遇到了一些比较难解决的问题，这里罗列一下。
### 微信公众号开发者文档  
因为游戏需要调用微信用户id，以对用户游戏成绩进行排序，来增强玩家成就感，所以需要调用微信  
登陆接口和分享功能。目前只能通过调用微信官方API来实现。  
- 申请个人公众号  
- 需要注册微信开发者账号  
- 进行微信开发的一系列配置。
  主要是 开发-> 基本配置 -> 设置开发者密码 -ip 白名单  
- 服务器配置  
这里服务器配置包含：url token EncodingAESKey 和加密方式。  
过程就是，配置完成后，微信官方后台会向你的url发送get请求，请求参数是 signature、timestamp、nonce、echostr  
你需要在后台将token、timestamp、nonce进行字典序排序和加密，完成后返回结果，具体逻辑在下面。    

```
let crypto = require('crypto'),  //引入加密模块
    config = require('./config');//引入配置文件
app.get('/token',function(req,res){
    //1.获取微信服务器Get请求的参数 signature、timestamp、nonce、echostr
    var signature = req.query.signature,//微信加密签名
        timestamp = req.query.timestamp,//时间戳
            nonce = req.query.nonce,//随机数
          echostr = req.query.echostr;//随机字符串

    //2.将token、timestamp、nonce三个参数进行字典序排序
    var array = [config.token,timestamp,nonce];
    array.sort();

    //3.将三个参数字符串拼接成一个字符串进行sha1加密
    var tempStr = array.join('');
    const hashCode = crypto.createHash('sha1'); //创建加密类型 
    var resultCode = hashCode.update(tempStr,'utf8').digest('hex'); //对传入的字符串进行加密
    console.log(signature,timestamp,nonce,echostr);
    //4.开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
    if(resultCode === signature){
        res.send(echostr);
    }else{
        res.send('mismatch');
    }
});
```  
如果保存成功，则服务器配置完成。  
- 获取access_token  
access_token就是每个api必须的字符串，每隔两个小时刷新一次，所以后台逻辑需要每隔两个小时请求一次access_token  
然后进行全局保存。  
请求路径是 'api.weixin.qq.com'
请求参数是'grant_type=client_credential&appid=appid&secret=secret'  
grant_type是固定的不用改变，appid就是你的开发者id，secret是你的开发者密码，可以在微信进行重置得到。  
以下是实现代码：
```
const URL = "api.weixin.qq.com";  
const path = "/cgi-bin/token?grant_type=client_credential&appid=appid&secret=secret";
let access_token;
let http = require('https');
let qs = require('querystring');
let options = {  
    hostname: URL,  
    path: path,  
    method: 'GET',  
    headers: {  
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'  
    }  
}; 
let playMusic = (callback)=>{
	var req = http.request(options, function (serverFeedback) {  
	        if (serverFeedback.statusCode == 200) {  
	            var body = "";  
	            serverFeedback.on('data', function (data) { body += data; })  
	                          .on('end', function () { 
	                          		access_token = body;
	                           });  
	        }  
	        else {  
	            res.send(500, "error");  
	        }  
	    });  
	req.end();  
}
```  
微信公众号接口完成
_______________________________________________________________________________________________________________

