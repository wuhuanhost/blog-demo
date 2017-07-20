

	const nodemailer = require('nodemailer');

	let transporter = nodemailer.createTransport({
	    host: 'smtp.163.com',
	    port: 465,
	    secure: true, // secure:true for port 465, secure:false for port 587
	    auth: {
			user: 'username@163.com', //邮箱的账号
			pass: '12312312312312'//邮箱的密码
	    }
	});



/**
 ** 发送邮件
*/
exports.send=function(to,url,cb){

	let mailOptions = {
	    from: '"Fred Foo 👻" <username@163.com>', //邮件来源
	    to: to, //邮件发送到哪里，多个邮箱使用逗号隔开
	    subject: '密码验证邮件', // 邮件主题
	    html: url // html类型的邮件正文
	};

	transporter.sendMail(mailOptions, (error, info) => {
	    if (error) {
			console.log(error);
		    cb(error,null);
	    }else{
			cb(null,info);
		}
	    //console.log('Message %s sent: %s', info.messageId, info.response);
	});
}