var express = require('express');
var router = express.Router();
var sha1 = require('sha1');
var path = require('path');
var UserModel = require('../models/users');
var checkNotLogin = require('../middlewares/check.js').checkNotLogin;

//注册页
router.get('/', checkNotLogin, function(req, res, next){
    res.render('signup.ejs');
    
});



//用户注册
router.post('/', checkNotLogin, function(req, res, next){

    var name = req.fields.name;  //http request header field
    var gender = req.fields.gender;
    var bio = req.fields.bio;
    var avatar = req.files.avatar.path.split(path.sep).pop();
    var password = req.fields.password;
    var repassword = req.fields.repassword;

    try{
        if(['m', 'f', 'x'].indexOf(gender) === -1){
            console.log('error in gender');
            throw new Error('性别只能是m、f、或者x');
        }
        if(!req.files.avatar.name){
            cosole.log('error in avatar');
            throw new Error('缺少头像');
        }
        if(password !== repassword){
            console.log('error in password');
            throw new Error('两次输入的密码不一致');
        }

    }catch(e){
        req.flash('error', e.message);
        return res.redirect('/signup');

    }
    password = sha1(password);
    var user = {
        name: name,
        password: password,
        gender: gender,
        bio: bio,
        avatar: avatar
    };

    UserModel.create(user)
        .then(function(result){
            console.log('create:' + result);
            user = result.ops[0];
            delete user.password;
            req.session.user = user;
            req.flash('success', '注册成功');
            res.redirect('/posts');
        })
        .catch(function(e){
            ('create error:' + e);
            
            if(e.message.match('E11000 duplicate key')){
                req.flash('error', '用户名已被占用');
                return res.redirect('/signup');
            }
            next(e);
        });
       
    
    
});

module.exports = router;

