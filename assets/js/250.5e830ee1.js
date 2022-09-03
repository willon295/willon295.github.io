(window.webpackJsonp=window.webpackJsonp||[]).push([[250],{607:function(a,t,_){"use strict";_.r(t);var v=_(13),e=Object(v.a)({},(function(){var a=this,t=a.$createElement,_=a._self._c||t;return _("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[_("h1",{attrs:{id:"_2-1-你好-go"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-你好-go"}},[a._v("#")]),a._v(" 2.1 你好，Go")]),a._v(" "),_("p",[a._v("在开始编写应用之前，我们先从最基本的程序开始。就像你造房子之前不知道什么是地基一样，编写程序也不知道如何开始。因此，在本节中，我们要学习用最基本的语法让Go程序运行起来。")]),a._v(" "),_("h2",{attrs:{id:"程序"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#程序"}},[a._v("#")]),a._v(" 程序")]),a._v(" "),_("p",[a._v("这就像一个传统，在学习大部分语言之前，你先学会如何编写一个可以输出"),_("code",[a._v("hello world")]),a._v("的程序。")]),a._v(" "),_("p",[a._v("准备好了吗？Let's Go!")]),a._v(" "),_("div",{staticClass:"language-Go extra-class"},[_("pre",{pre:!0,attrs:{class:"language-go"}},[_("code",[a._v("\n"),_("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("package")]),a._v(" main\n\n"),_("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("import")]),a._v(" "),_("span",{pre:!0,attrs:{class:"token string"}},[a._v('"fmt"')]),a._v("\n\n"),_("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("func")]),a._v(" "),_("span",{pre:!0,attrs:{class:"token function"}},[a._v("main")]),_("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),_("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),_("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n\tfmt"),_("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),_("span",{pre:!0,attrs:{class:"token function"}},[a._v("Printf")]),_("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),_("span",{pre:!0,attrs:{class:"token string"}},[a._v('"Hello, world or 你好，世界 or καλημ ́ρα κóσμ or こんにちはせかい\\n"')]),_("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n"),_("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])])]),_("p",[a._v("输出如下：")]),a._v(" "),_("div",{staticClass:"language- extra-class"},[_("pre",[_("code",[a._v("Hello, world or 你好，世界 or καλημ ́ρα κóσμ or こんにちはせかい\n")])])]),_("h2",{attrs:{id:"详解"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#详解"}},[a._v("#")]),a._v(" 详解")]),a._v(" "),_("p",[a._v("首先我们要了解一个概念，Go程序是通过"),_("code",[a._v("package")]),a._v("来组织的")]),a._v(" "),_("p",[_("code",[a._v("package <pkgName>")]),a._v("（在我们的例子中是"),_("code",[a._v("package main")]),a._v("）这一行告诉我们当前文件属于哪个包，而包名"),_("code",[a._v("main")]),a._v("则告诉我们它是一个可独立运行的包，它在编译后会产生可执行文件。除了"),_("code",[a._v("main")]),a._v("包之外，其它的包最后都会生成"),_("code",[a._v("*.a")]),a._v("文件（也就是包文件）并放置在"),_("code",[a._v("$GOPATH/pkg/$GOOS_$GOARCH")]),a._v("中（以Mac为例就是"),_("code",[a._v("$GOPATH/pkg/darwin_amd64")]),a._v("）。")]),a._v(" "),_("blockquote",[_("p",[a._v("每一个可独立运行的Go程序，必定包含一个"),_("code",[a._v("package main")]),a._v("，在这个"),_("code",[a._v("main")]),a._v("包中必定包含一个入口函数"),_("code",[a._v("main")]),a._v("，而这个函数既没有参数，也没有返回值。")])]),a._v(" "),_("p",[a._v("为了打印"),_("code",[a._v("Hello, world...")]),a._v("，我们调用了一个函数"),_("code",[a._v("Printf")]),a._v("，这个函数来自于"),_("code",[a._v("fmt")]),a._v("包，所以我们在第三行中导入了系统级别的"),_("code",[a._v("fmt")]),a._v("包："),_("code",[a._v('import "fmt"')]),a._v("。")]),a._v(" "),_("p",[a._v("包的概念和Python中的package类似，它们都有一些特别的好处：模块化（能够把你的程序分成多个模块)和可重用性（每个模块都能被其它应用程序反复使用）。我们在这里只是先了解一下包的概念，后面我们将会编写自己的包。")]),a._v(" "),_("p",[a._v("在第五行中，我们通过关键字"),_("code",[a._v("func")]),a._v("定义了一个"),_("code",[a._v("main")]),a._v("函数，函数体被放在"),_("code",[a._v("{}")]),a._v("（大括号）中，就像我们平时写C、C++或Java时一样。")]),a._v(" "),_("p",[a._v("大家可以看到"),_("code",[a._v("main")]),a._v("函数是没有任何的参数的，我们接下来就学习如何编写带参数的、返回0个或多个值的函数。")]),a._v(" "),_("p",[a._v("第六行，我们调用了"),_("code",[a._v("fmt")]),a._v("包里面定义的函数"),_("code",[a._v("Printf")]),a._v("。大家可以看到，这个函数是通过"),_("code",[a._v("<pkgName>.<funcName>")]),a._v("的方式调用的，这一点和Python十分相似。")]),a._v(" "),_("blockquote",[_("p",[a._v("前面提到过，包名和包所在的文件夹名可以是不同的，此处的"),_("code",[a._v("<pkgName>")]),a._v("即为通过"),_("code",[a._v("package <pkgName>")]),a._v("声明的包名，而非文件夹名。")])]),a._v(" "),_("p",[a._v("最后大家可以看到我们输出的内容里面包含了很多非ASCII码字符。实际上，Go是天生支持UTF-8的，任何字符都可以直接输出，你甚至可以用UTF-8中的任何字符作为标识符。")]),a._v(" "),_("h2",{attrs:{id:"结论"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#结论"}},[a._v("#")]),a._v(" 结论")]),a._v(" "),_("p",[a._v("Go使用"),_("code",[a._v("package")]),a._v("（和Python的模块类似）来组织代码。"),_("code",[a._v("main.main()")]),a._v("函数(这个函数位于主包）是每一个独立的可运行程序的入口点。Go使用UTF-8字符串和标识符(因为UTF-8的发明者也就是Go的发明者之一)，所以它天生支持多语言。")]),a._v(" "),_("h2",{attrs:{id:"links"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#links"}},[a._v("#")]),a._v(" links")]),a._v(" "),_("ul",[_("li",[_("RouterLink",{attrs:{to:"/编程语言/Go/preface.html"}},[a._v("目录")])],1),a._v(" "),_("li",[a._v("上一节: "),_("RouterLink",{attrs:{to:"/编程语言/Go/02.0.html"}},[a._v("Go语言基础")])],1),a._v(" "),_("li",[a._v("下一节: "),_("RouterLink",{attrs:{to:"/编程语言/Go/02.2.html"}},[a._v("Go基础")])],1)])])}),[],!1,null,null,null);t.default=e.exports}}]);