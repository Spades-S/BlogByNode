module.exports = function(app){
    app.get('/', function(req, res){
        res.redirect('/posts');
    });
    app.use('/signup', require('./signup'));
    app.use('/signin', require('./signin'));
    app.use('/signout', require('./signout'));
    app.use('/posts', require('./posts'));
    //404错误处理
    app.use(function(req, res){require
        if(!res.headerSent){
            res.render('404');
        }

    })

}