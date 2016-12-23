## BuildingSpadesBlog

#### nrm

>nrm 是一个管理npm源的工具

全局安装nrm：

````shell
npm i nrm -g
````

#### require

> provide a way to load a module

* require可以加载.js、.json、.node后缀的文件

* require的过程是同步的

* require目录的机制：

  当Node遇到require(X)时，按照下面的顺序处理

  * 如果X是内置模块

    a. 返回该模块

    b. 不在继续执行

  * 如果X是以“ ./ ”或者“ / ”或者“ ../ ”开头

    a. 根据X所在的父模块，确定X的绝对路径

    b. 当X当成文件，如果文件类型是：X，X.js，X.node时将其载入为JavaScript文本；如果是X.json，将其载入为JavaScript对象

    c.将X当成是目录，依次查找目录下文件，如果存在X/package.json(含有main字段)， X/index.js， X/index.json， X/index.node就返回该文件

* require过的文件会加载到缓存，多次require一个文件不会重复加载



#### exports 和module.exports

> exports 和 module.exports 用于导出代码

* module.exports 初始值是一个空对象
* exports 是指向module.exports 的引用
* require()返回的是module.exports而不是exports



#### npm shrinkwrap

> 锁定依赖版本





#### session

> HTTP是无状态的，cookie机制是采用在客户端保存状态的机制，session采用的是在服务器端保存状态的方案，由于采用服务器端保持状态的方案在客户端也需要保存一个标识，所以session机制可能需要借助cookie机制来达到保存标识的目的，**当然也有其他的选择**

* cookie 的机制

  正统的cookie分发是通过扩展http协议来实现的，服务器通过在HTTP响应头中加上一行特殊的指示以提示浏览器按照指示生成相应的cookie。cookie的使用是浏览器按照一定的原则在后台自动发送给服务器。

  cookie的主要内容包括：名字， 值， 过期时间，路径和域。域用于指定特定的域。路径是域名后面的URL路径，路径和域合在一起就构成了cookie的作用范围。如果不设置过期时间，表示这个cookie生命期为浏览器的会话时间，关闭浏览器，cookie就会消失。会话cookie一般存在内存中，不存放在硬盘里。如果设置了过期时间，浏览器就会将cookie保存在硬盘上，关闭后再次打开浏览器，这些cookie仍然有效直到超过设定的过期时间。

  存储在硬盘上的cookie可以在不同的浏览器进程间共享。保存在内存中的cookie不同的浏览器有不同的处理方式。

* session机制

  session机制是一种服务器端的机制，服务器使用一种类似于散列表的结构来保存信息。

  当程序要为某个客户端的请求创建一个session时，服务器首先检查该客户端的请求里是否已经包含了一个session标识，成为session-id，如果已经包含了session-id说明此前已经为该客户端创建过session，服务器就按照session-id将该session检索出来使用。如果不包含session-id ，会为该客户端新建一个session并且生成一个与该session相关的session-id 。session-id是一个既不会重复又不容易找到规律加以仿照的字符串，这个session-id 将机会在本次响应中返回给客户端。

  保存session-id的方式可以采用cookie，这样在交互过程中浏览器可以自动按照规则将这个标识发送给服务器。由于cookie可以被人为地禁止，必须有其他机制以便在cookie被禁止时仍然能够把session-id 传回服务器。经常采用的一种技术是URL重写，就是把session-id直接附加在URL路径的后面。方式两种，一种作为URL路径的附加信息，http://...../xxx;jsessionid=ByOK3vjFD75aPnrF7C2HmdnV6QZcEbzWoWiBYEnLerjQ99zWpBng!-145788764 ；另一种作为查询字符串附加在URL后面，表现形式：http://...../xxx?jsessionid=ByOK3vjFD75aPnrF7C2HmdnV6QZcEbzWoWiBYEnLerjQ99zWpBng!-145788764 

  由于关闭浏览器不会导致session被删除，迫使服务器为session设置了一个失效时间，当距离客户端上一次使用session的时间超过了这个失效时间，服务器就可以认为客户端已经停止了活动，才会把session删除以节约存储空间。

* Session的典型应用场景：购物车。当点击下单时，HTTP协议是无状态的，所以并不知道是哪个用户操作的，服务端需要为特定的用户创建特定的session，用于标识用户并跟踪用户。在服务端保存session的方法有很多，内存、数据库、文件都有。集群的时候也要考虑session的转移，大型网站中一般会有专门的session服务器集群，用以保存用户的会话，这个时候session信息都是放在内存的，使用一些缓存服务比如**Memcached**之类的来存放session

* summary：

  session是在服务端保存的一个数据结构，用来跟踪用户的状态，这个数据可以保存在集群、数据库、文件中；

  cookie是客户端保存用户信息的一种机制，用来记录用户的一些信息，也是*实现session的一种方式*

  ​


#### express-session

> session的运作是通过session-id来进行的。session-id通常是放在客户端的cookie中的。express-session默认的是connect.sid

express-sesssion主要的方法就是session(options)，其中options可以包含的参数主要有

* name：设置cookie中保存session的字段的名字，默认：connect.sid
* store：session的存储方式默认内存，也可以使用redis，mongodb等
* secret：通过设置的secret字符串，来计算hash值并保存在cookie中，唯一标识cookie防篡改
* cookie：设置存放session-id的cookie的相关选项



#### connect-flash

> the flash is a special area of the session used for storing messages. Messages are written to the flash and cleared after being displayed to the user.



#### 权限控制

> 权限控制设计思路：将用户的状态检查封装成一个中间件，每个需要权限控制的路由加载该中间件，即可实现页面的权限控制



#### 中间件的加载顺序

>中间件的加载顺序很重要。blog中设置静态文件目录的中间件应该放到routes(app)之前加载，这样静态文件的请求就不会落到业务逻辑的路由里；flash中间件应该放到session中间件后加载，因为flash是基于session的

```javascript
//index.js
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    name: config.session.key,
    secret: config.session.secret,
    cookie: {
        maxAge: config.session.maxAge //cookie的过期时间，过期后cookie中保存的session-id将自动删除
    },
    store: new MongoStore({
        url: config.mongodb
    })
}))

app.use(flash());

routes(app);
```



#### app.locals 和 res.locals

> express中有两个对象可以用于模板的渲染：app.locals 和 res.locals

调用res.render时，express合并(merge)了3处的结果后传入要渲染的模板，优先级：res.render传入的对象 > res.local 对象 > app.locals 对象

app.locals通常挂在常量信息，res.locals通常挂在变量信息，即每次请求的值可能都不同。

```javascript
app.locals.blog = {
    title: pkg.name,
    description: pkg.description
};

app.use(function (req, res, next) {
    res.locals.user = req.session.user;
    res.locals.success = req.flash('success').toString();
    res.locals.error = req.flash('error').toString();
    next();
});
```

**使用app.locals 和 res.locals的作用** 调用res.render时将不用传入上述四个变量，express将会自动合并(merge)并传入模板，在模板中将可以直接使用这四个变量。