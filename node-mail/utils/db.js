var mysql = require('mysql');
var pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "blog-demo",
    port: 3306,
	charset: 'UTF8MB4_GENERAL_CI',
	connectionLimit: 10
});

//执行sql语句的方法，包括增删改查
exports.execSql = function(sql, param, callback) {
        pool.getConnection(function(err, connection) {
            if (err) {
				console.log(err)
                console.error("数据库连接超时！");
                return callback(err, null);
            } else {
                connection.query(sql, param, function(error, results) {
                    connection.release(); //关掉连接，释放资源
                    if (error) {
                        console.error(error);
                        callback(error, null);
                    } else {
                        callback(null, results);
                    }
                });
            }
        });
    }
