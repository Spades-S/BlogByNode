# nodejs

> reuqire

* require 可以加载.js 、.json、.node 后缀的文件
* require 是同步的
* require的目录机制

1. 如果目录下有package.json并指定了main字段，则用之
2. 如果不存在package.json文件，依次尝试加载目录下的index.js和index.node 文件

* require过的文件或加载到缓存，多次require同一个文件不会重复加载

`require的循环引用`

```javascript
a -> b
b -> c
```

`require循环引用并不会报错，导致的结果是require的结果总是空对象，原因是b require了a，a又去require了b，此时b还没有初始化好，所以只能拿到初始值{}`



> config-lite

config-lite 是一个轻量的读取配置文件模块。config-lite会根据环境变量的不同从当前执行进程的目录下的config 目录加载不同的配置文件。

​	  







