var express = require('express');
var router = express.Router();
var db=require('../utils/db.js');
var sendMail=require('../utils/send_mail.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//注册方法
router.post('/register', function(req, res, next) {
  var email=req.body.email;
  var username=req.body.username;
  var password=req.body.password;
   //1、参数校验
   //to do
  console.log(email+"  "+username+"  "+password)
  var code=Math.floor(Math.random() * 999999);//生成用户校验的随机数字	
  var sql="insert into user_info(username,password,email,email_state,code) values(?,?,?,?,?)";
  var params=[username,password,email,0,code];
  //2、注册
  db.execSql(sql,params,function(err,result){
	  console.log(result)
	 if(!err){
		 //3、发送邮件
		 sendMail.send(email,'http://localhost:3000/checkmail?uid='+result.insertId+'&code='+code,function(err1,result1){
		    if(!err){
			  res.render('home',{title:"恭喜你！注册成功，邮件已发送至你的邮箱，请登录你的邮箱进行验证！"});
			}else{
			  res.render('error',{message:"服务器错误！"})	
			}
		 });
	 }
  })
});


//验证邮箱
router.get('/checkmail', function(req, res, next) {
	var uid=req.query.uid;
	var code=req.query.code;
	var sql="update user_info set email_state=? where email!='' and code=? and id=?";
	var params=[1,code,uid];
	//1、参数校验
	//to do
	//2、校验邮箱
	db.execSql(sql,params,function(err,result){
		if(!err){
			if(parseInt(result.changedRows)===1){
				res.render('home',{title:"恭喜你、邮箱校验成功！"})
			}else{
			    res.render('error',{message:"邮箱校验失败！"})
			}
		}else{
			res.render('error',{message:"验证邮箱出现异常，请稍后重试！！！"});	
		}
	})
});


module.exports = router;
