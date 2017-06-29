---
title: '[PHP]Cookie使用'
category: PHP
tag: PHP

---

# Cookie
setcookie函数，setcookie具有7个可选参数，我们常用到的为前5个：
- name（ Cookie名）可以通过$_COOKIE['name'] 进行访问
- value（Cookie的值）
- expire（过期时间）Unix时间戳格式，默认为0，表示浏览器关闭即失效
- path（有效路径）如果路径设置为'/'，则整个网站都有效
- domain（有效域）默认整个域名都有效，如果设置了'www.baidu.com',则只在www子域中有效
```
#通过此方法设置cookie
set_cookie(name，value);

#通过此cookie获取cookie
$_COOKIE['name'];
```

# session
先执行`session_start`方法开启session，然后通过全局变量`$_SESSION`进行session的读写。
```
#开始session
session_start();

#设置session
$_SESSION['test'] = time();

#销毁session
unset($_SESSION['name']);
```

# session与cookie的异同
- `cookie`将数据存储在`客户端`，建立起用户与服务器之间的联系，通常可以解决很多问题，但是cookie仍然具有一些局限：

- `cookie`相对不是太安全，容易被盗用导致cookie欺骗,单个cookie的值最大只能存储4k每次请求都要进行网络传输，占用带宽

- `session`是将用户的会话数据存储在`服务端`，没有大小限制，通过一个`session_id`进行用户识别，PHP默认情况下session id是通过cookie来保存的，因此从某种程度上来说，seesion依赖于cookie。但这不是绝对的，session id也可以通过参数来实现，只要能将session id传递到服务端进行识别的机制都可以使用session
