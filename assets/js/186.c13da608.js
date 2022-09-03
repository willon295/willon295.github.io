(window.webpackJsonp=window.webpackJsonp||[]).push([[186],{561:function(t,s,a){"use strict";a.r(s);var n=a(13),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"_1-什么是跨域问题"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-什么是跨域问题"}},[t._v("#")]),t._v(" 1. 什么是跨域问题")]),t._v(" "),a("h2",{attrs:{id:"_1-1-发生的条件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-发生的条件"}},[t._v("#")]),t._v(" 1.1 发生的条件")]),t._v(" "),a("ol",[a("li",[a("code",[t._v("调用方")]),t._v("   和 "),a("code",[t._v("被调用方")]),t._v(" 不在同一域")]),t._v(" "),a("li",[t._v("浏览器会进行响应跨域校验")]),t._v(" "),a("li",[t._v("发送的是 "),a("code",[t._v("XHR")]),t._v("  （XML HttpRequest）类型请求")])]),t._v(" "),a("blockquote",[a("p",[t._v("解决跨域问题 只要打破其中一个条件即可")])]),t._v(" "),a("h2",{attrs:{id:"_1-2-现象"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-现象"}},[t._v("#")]),t._v(" 1.2 现象")]),t._v(" "),a("ol",[a("li",[a("code",[t._v("被调用方")]),t._v(" ： "),a("code",[t._v("正常响应")]),t._v("  请求")]),t._v(" "),a("li",[a("code",[t._v("调用方")]),t._v(" ： "),a("code",[t._v("正常请求")]),t._v(" ，不正常的数据响应  "),a("code",[t._v("Access-Control-Allow-Origin Not allow")])])]),t._v(" "),a("p",[t._v("举个例子 ： http://localhost:63343 请求  http://localhost:8080/get")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("Failed to load http://localhost:8080/get: \nNo 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:63343' is therefore not allowed access.\n")])])]),a("p",[t._v("发生跨域")]),t._v(" "),a("h2",{attrs:{id:"_1-3-why"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-why"}},[t._v("#")]),t._v(" 1.3 Why?")]),t._v(" "),a("p",[t._v("说到底还是 "),a("code",[t._v("浏览器")]),t._v(" 的锅， 每次浏览器发送 "),a("code",[t._v("请求")]),t._v(" （简单请求，非简单请求）之后，浏览器会做以下几件事情：")]),t._v(" "),a("h3",{attrs:{id:"简单请求"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#简单请求"}},[t._v("#")]),t._v(" 简单请求")]),t._v(" "),a("p",[t._v("简单请求就是 "),a("code",[t._v("get，post")]),t._v("， 浏览器是 "),a("code",[t._v("先执行")]),t._v("，"),a("code",[t._v("后校验")])]),t._v(" "),a("ol",[a("li",[t._v("直接执行请求，多出一个Header ： "),a("code",[t._v("Access-Control-Allow-Origin")])]),t._v(" "),a("li",[t._v("得到返回数据， 进行数据验证，如果不是同一域， 报错")])]),t._v(" "),a("h3",{attrs:{id:"非简单请求"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#非简单请求"}},[t._v("#")]),t._v(" 非简单请求")]),t._v(" "),a("p",[t._v("其他 "),a("code",[t._v("put")]),t._v(" "),a("code",[t._v("delete")]),t._v(" 等请求， 浏览器会 "),a("code",[t._v("先校验")]),t._v("  ，"),a("code",[t._v("再执行")]),t._v("， 如果跨域，直接报错")]),t._v(" "),a("h2",{attrs:{id:"_2-如何解决"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-如何解决"}},[t._v("#")]),t._v(" 2 如何解决")]),t._v(" "),a("h3",{attrs:{id:"_2-1-浏览器设置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-浏览器设置"}},[t._v("#")]),t._v(" 2.1 浏览器设置")]),t._v(" "),a("p",[t._v("这是一个 "),a("code",[t._v("不合理")]),t._v(" 的解决办法，因为不是每位用户都会操作， 以chrome为例，启动时带上参数：")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("Chrome --args --disable-web-security\n")])])]),a("h3",{attrs:{id:"_2-2-jsonp方式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-jsonp方式"}},[t._v("#")]),t._v(" 2.2 JSONP方式")]),t._v(" "),a("p",[t._v("首先注意这也是一个 "),a("code",[t._v("不怎么友好")]),t._v(" 的解决方式， 因为前端 请求数据类型需要改成 "),a("code",[t._v("jsonp")]),t._v(" ， "),a("code",[t._v("被调用方")]),t._v(" 需要 "),a("code",[t._v("全局过滤器")]),t._v("  设置 "),a("code",[t._v("callback")]),t._v(" 方法名，注意的是：")]),t._v(" "),a("ol",[a("li",[t._v("发送和返回的数据是 "),a("code",[t._v("js 回调函数")]),t._v(" ， 不是简单的 JSON 数据")]),t._v(" "),a("li",[t._v("发送的 "),a("code",[t._v("callback")]),t._v("  参数名称 必须和 被调用方 "),a("code",[t._v("相同")])]),t._v(" "),a("li",[t._v("只能处理 get 方式请求")])]),t._v(" "),a("h3",{attrs:{id:"_2-3-spring-mvc方式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-3-spring-mvc方式"}},[t._v("#")]),t._v(" 2.3 Spring MVC方式")]),t._v(" "),a("p",[t._v("这个解决方式 "),a("code",[t._v("比较友好")]),t._v(" ，在 每个 "),a("code",[t._v("Controller")]),t._v(" 之上写 "),a("code",[t._v('@CrossOrigin(origins = "*", maxAge = 3600)')]),t._v(" ,释义：")]),t._v(" "),a("ol",[a("li",[t._v("允许跨域，增加响应头，浏览器校验到允许跨域之后，请求方正常响应")]),t._v(" "),a("li",[t._v("设置跨域校验时间： 在3600秒内浏览器不再校验")])]),t._v(" "),a("p",[t._v("举个实例：")]),t._v(" "),a("p",[a("strong",[t._v("后端代码")]),t._v(" :")]),t._v(" "),a("div",{staticClass:"language-java extra-class"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[a("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@RestController")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@CrossOrigin")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("allowedHeaders "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"*"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" maxAge "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3600")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("IndexController")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@GetMapping")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"/get"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("User")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("get")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("User")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"willon"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n")])])]),a("h3",{attrs:{id:"_2-4-nginx代理解决"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-4-nginx代理解决"}},[t._v("#")]),t._v(" 2.4 Nginx代理解决")]),t._v(" "),a("p",[t._v("这是一个比较好的解决凡是，具体解决则取决于整个 站点的 架构设计， 可以分为两种方式")]),t._v(" "),a("ol",[a("li",[t._v("显示跨域：  浏览器URL可以看到实际的请求地址")]),t._v(" "),a("li",[t._v("隐式跨域： 浏览器URL还是当前域， 只是请求被Nginx转发")])]),t._v(" "),a("p",[t._v("这里介绍 "),a("code",[t._v("隐式跨域")]),t._v(" ，请求的过程：")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("请求 a.com/get \n--\x3e Nginx服务器 \n--\x3e 代理 a.com/get 请求到 b.com:8080/get\n--\x3e b.com:8080/get 处理并返回给 Nginx  \n--\x3e  Nginx响应给请求方\n\n")])])]),a("h3",{attrs:{id:"配置文件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#配置文件"}},[t._v("#")]),t._v(" 配置文件")]),t._v(" "),a("ol",[a("li",[a("p",[a("code",[t._v("a .com")]),t._v("  配置")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//前台请求代码")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("get")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        $"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("ajax")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("url")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"/get"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("type")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"GET"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("success")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("res")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("res"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("id "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"___"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" res"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("error")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("res")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n                console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("res"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n   "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("div",{staticClass:"language-nginx extra-class"},[a("pre",{pre:!0,attrs:{class:"language-nginx"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#nginx配置文件")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token directive"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("upstream")]),t._v(" b.com")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token directive"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("server")]),t._v(" b.com:8080")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token directive"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("server")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token directive"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("listen")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("80")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token directive"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("server_name")]),t._v(" a.com")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token directive"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("root")]),t._v("  /www/a_com")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token directive"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("location")]),t._v(" /")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#将本地的请求转发给 b.com/get")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token directive"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("location")]),t._v(" /get")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token directive"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("proxy_pass")]),t._v(" http://b.com/get")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n")])])])]),t._v(" "),a("li",[a("p",[a("code",[t._v("b.com")]),t._v(" 配置文件,简单的配置")])])]),t._v(" "),a("div",{staticClass:"language-nginx extra-class"},[a("pre",{pre:!0,attrs:{class:"language-nginx"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#nginx配置")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token directive"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("server")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token directive"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("listen")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("80")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token directive"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("server_name")]),t._v(" b.com")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("div",{staticClass:"language-java extra-class"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//后端处理")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@RestController")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("IndexController")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@GetMapping")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"/get"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("User")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("get")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("User")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"willon"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("ol",{attrs:{start:"3"}},[a("li",[t._v("当 a.com 发送请求之后， b.com 会处理并且响应， 不会发生跨域带来的问题。")])]),t._v(" "),a("p",[t._v("从调用者的角度看 ： 发送的请求是这样的")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[t._v("Request "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("URL")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" http"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("com"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("get")]),t._v("\nRequest Method"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("GET")]),t._v("\nStatus Code"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("200")]),t._v(" \nRemote Address"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("127.0")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v(".0")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v(".1")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("80")]),t._v("\nReferrer Policy"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" no"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("referrer"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("when"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("downgrade\n")])])])])}),[],!1,null,null,null);s.default=e.exports}}]);