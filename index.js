var path = require('path');
var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash'); // flash是一个暂存器，里面的值使用一次即被清空
var config = require('config-lite');
var routes = require('./routes');
var pkg = require('./package.json');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('views engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    name: config.session.key,
    secret: config.session.secret,
    cookie: {
        maxAge: config.session.maxAge
    },
    store: new MongoStore({
        url: config.mongodb
    })
}))

app.use(flash());

routes(app);

app.listen(config.port, function(){
    console.log('${pkg.name} listening on port ${config.port}');
    console.log(`${pkg.name} listening on port ${config.port}`);
});