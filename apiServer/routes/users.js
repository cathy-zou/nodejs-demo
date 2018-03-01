var express = require('express');
var router = express.Router();

// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var userSQL = require('../db/Usersql');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );
// 响应一个JSON数据
var responseJSON = function (res, ret) {
    if(typeof ret === 'undefined') {
        res.json({     code:'-200',     msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};
// 添加用户
router.post('/addUser', function(req, res, next){
    // 从连接池获取连接
    pool.getConnection(function(err, connection) {
// 获取前台页面传过来的参数
        var param = req.body;
// 建立连接 增加一个用户信息
        connection.query(userSQL.insert,
            [
                param.id,
                param.name,
                param.age,
                param.gender,
                param.birthday,
                param.viplevel,
                param.description,
                param.account,
                param.mobile,
                param.address,
                param.email
            ],
            function(err, result) {
            if(result) {
                result = {
                    code: 200,
                    msg:'增加成功'
                };
                // 以json形式，把操作结果返回给前台页面
                res.send(result);
            } else {
                console.log(err)
                res.send({code: '-200', msg: '添加失败'});
            }
            // 释放连接
            connection.release();

        });
    });
});
// 修改用户
router.post('/editUser', function(req, res, next){
    // 从连接池获取连接
    pool.getConnection(function(err, connection) {
// 获取前台页面传过来的参数
        var param = req.body;
// 建立连接 增加一个用户信息
        connection.query(userSQL.updateUserById,
            [
                param.name,
                param.age,
                param.gender,
                param.birthday,
                param.viplevel,
                param.description,
                param.account,
                param.mobile,
                param.address,
                param.email,
                param.id
            ],
            function(err, result) {
                if(result) {
                    result = {
                        code: 200,
                        msg:'修改成功'
                    };
                    // 以json形式，把操作结果返回给前台页面
                    res.send(result);
                } else {
                    console.log(err)
                    res.send({code: '-200', msg: '修改失败'});
                }
                // 释放连接
                connection.release();

            });
    });
});
// 查询用户
router.get('/getUserList', function(req, res, next){
    // 从连接池获取连接
    pool.getConnection(function(err, connection) {
// 获取前台页面传过来的参数
        var param = req.query || req.params;
// 建立连接 增加一个用户信息
        connection.query(userSQL.queryAll, function(err, rows, field) {
            if (err) {
                console.log('[query] - :' + err);
                return;
            }
            var data = {
              code: 200,
              msg: '获取成功',
              data: rows
            }
            res.send(data)
            // 释放连接
            connection.release();

        });
    });
});
// 获取用户信息
router.get('/getUserInfo',function (req, res ,next) {
    // 从连接池获取连接
    pool.getConnection(function(err, connection) {
// 获取前台页面传过来的参数
        var param = req.query || req.params;
        console.log(param)
// 建立连接 增加一个用户信息
        connection.query(userSQL.getUserById, [param.id], function(err, result) {
            if(result) {
               var data = {
                    code: 200,
                    msg:'获取成功',
                    data: result
                };
                res.send(data);
            } else {
              var data = {
                code: '-200',
                msg: '找不到该条数据'
              }
              res.send(data)
            }
            // 释放连接
            connection.release();
        });
    });
});
// 删除用户信息
router.get('/deleteUser',function (req, res ,next) {
    // 从连接池获取连接
    pool.getConnection(function(err, connection) {
// 获取前台页面传过来的参数
        var param = req.query || req.params;
        console.log(param)
// 建立连接 增加一个用户信息
        connection.query(userSQL.deleteById, [param.id], function(err, result) {
            if(result) {
                var data = {
                    code: 200,
                    msg:'删除成功',
                    data: result
                };
                res.send(data);
            } else {
                var data = {
                    code: '-200',
                    msg: '找不到该条数据'
                }
                res.send(data)
            }
            // 释放连接
            connection.release();
        });
    });
});
module.exports = router;
