var express = require('express');
var router = express.Router();

var checkNotLogin = require('../middlewares/check.js').checkNotLogin;

//注册页
router.get('/', checkNotLogin, function(req, res, next){
    // res.send(req.flash());
    console.log(req.fields);
    res.render('signup.ejs');
    
});



//用户注册
router.post('/', checkNotLogin, function(req, res, next){

    var name = req.fields.name;
    var gender = req.fields.gender;
    var bio = req.fields.bio;
    var password = req.fields.password;
    var repassword = req.fields.repassword;
    res.send(req.fields);
});

module.exports = router;

