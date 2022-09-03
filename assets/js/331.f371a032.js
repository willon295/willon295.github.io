(window.webpackJsonp=window.webpackJsonp||[]).push([[331],{425:function(s,t,a){"use strict";a.r(t);var n=a(13),e=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"_14-2-session支持"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_14-2-session支持"}},[s._v("#")]),s._v(" 14.2 Session支持")]),s._v(" "),a("p",[s._v("第六章的时候我们介绍过如何在Go语言中使用session，也实现了一个sessionManger，beego框架基于sessionManager实现了方便的session处理功能。")]),s._v(" "),a("h2",{attrs:{id:"session集成"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#session集成"}},[s._v("#")]),s._v(" session集成")]),s._v(" "),a("p",[s._v("beego中主要有以下的全局变量来控制session处理：")]),s._v(" "),a("div",{staticClass:"language-Go extra-class"},[a("pre",{pre:!0,attrs:{class:"language-go"}},[a("code",[s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//related to session ")]),s._v("\nSessionOn            "),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("bool")]),s._v("   "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 是否开启session模块，默认不开启")]),s._v("\nSessionProvider      "),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("string")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// session后端提供处理模块，默认是sessionManager支持的memory")]),s._v("\nSessionName          "),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("string")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 客户端保存的cookies的名称")]),s._v("\nSessionGCMaxLifetime "),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("int64")]),s._v("  "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// cookies有效期")]),s._v("\n\nGlobalSessions "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v("session"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("Manager "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//全局session控制器")]),s._v("\n")])])]),a("p",[s._v("当然上面这些变量需要初始化值，也可以按照下面的代码来配合配置文件以设置这些值：")]),s._v(" "),a("div",{staticClass:"language-Go extra-class"},[a("pre",{pre:!0,attrs:{class:"language-go"}},[a("code",[s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" ar"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" err "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":=")]),s._v(" AppConfig"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("Bool")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"sessionon"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" err "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("nil")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n\tSessionOn "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("false")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("else")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n\tSessionOn "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" ar\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" ar "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":=")]),s._v(" AppConfig"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("String")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"sessionprovider"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" ar "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("==")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('""')]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n\tSessionProvider "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"memory"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("else")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n\tSessionProvider "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" ar\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" ar "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":=")]),s._v(" AppConfig"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("String")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"sessionname"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" ar "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("==")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('""')]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n\tSessionName "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"beegosessionID"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("else")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n\tSessionName "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" ar\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" ar"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" err "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":=")]),s._v(" AppConfig"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("Int")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"sessiongcmaxlifetime"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" err "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("nil")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" ar "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n\tint64val"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("_")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":=")]),s._v(" strconv"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("ParseInt")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("strconv"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("Itoa")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("ar"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("64")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\tSessionGCMaxLifetime "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" int64val\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("else")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n\tSessionGCMaxLifetime "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("3600")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\t\n")])])]),a("p",[s._v("在beego.Run函数中增加如下代码：")]),s._v(" "),a("div",{staticClass:"language-Go extra-class"},[a("pre",{pre:!0,attrs:{class:"language-go"}},[a("code",[s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" SessionOn "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n\tGlobalSessions"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("_")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" session"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("NewManager")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("SessionProvider"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" SessionName"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" SessionGCMaxLifetime"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("go")]),s._v(" GlobalSessions"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("GC")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),a("p",[s._v("这样只要SessionOn设置为true，那么就会默认开启session功能，独立开一个goroutine来处理session。")]),s._v(" "),a("p",[s._v("为了方便我们在自定义Controller中快速使用session，作者在"),a("code",[s._v("beego.Controller")]),s._v("中提供了如下方法：")]),s._v(" "),a("div",{staticClass:"language-Go extra-class"},[a("pre",{pre:!0,attrs:{class:"language-go"}},[a("code",[s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("func")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("c "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v("Controller"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("StartSession")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("sess session"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("Session"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n\tsess "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" GlobalSessions"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("SessionStart")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("c"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("Ctx"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("ResponseWriter"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" c"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("Ctx"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("Request"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\t\t\n")])])]),a("h2",{attrs:{id:"session使用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#session使用"}},[s._v("#")]),s._v(" session使用")]),s._v(" "),a("p",[s._v("通过上面的代码我们可以看到，beego框架简单地继承了session功能，那么在项目中如何使用呢？")]),s._v(" "),a("p",[s._v("首先我们需要在应用的main入口处开启session：")]),s._v(" "),a("div",{staticClass:"language-Go extra-class"},[a("pre",{pre:!0,attrs:{class:"language-go"}},[a("code",[s._v("\nbeego"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("SessionOn "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),s._v("\n")])])]),a("p",[s._v("然后我们就可以在控制器的相应方法中如下所示的使用session了：")]),s._v(" "),a("div",{staticClass:"language-Go extra-class"},[a("pre",{pre:!0,attrs:{class:"language-go"}},[a("code",[s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("func")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("this "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v("MainController"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("Get")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" intcount "),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("int")]),s._v("\n\tsess "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":=")]),s._v(" this"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("StartSession")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\tcount "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":=")]),s._v(" sess"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("Get")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"count"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" count "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("==")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("nil")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n\t\tintcount "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("\n\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("else")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n\t\tintcount "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" count"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("int")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\tintcount "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" intcount "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\n\tsess"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("Set")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"count"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" intcount"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\tthis"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("Data"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Username"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"astaxie"')]),s._v("\n\tthis"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("Data"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Email"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"astaxie@gmail.com"')]),s._v("\n\tthis"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("Data"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Count"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" intcount\n\tthis"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("TplNames "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"index.tpl"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),a("p",[s._v("上面的代码展示了如何在控制逻辑中使用session，主要分两个步骤：")]),s._v(" "),a("ol",[a("li",[s._v("获取session对象")])]),s._v(" "),a("div",{staticClass:"language-Go extra-class"},[a("pre",{pre:!0,attrs:{class:"language-go"}},[a("code",[s._v("\n\t"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//获取对象,类似PHP中的session_start()")]),s._v("\n\tsess "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":=")]),s._v(" this"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("StartSession")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[s._v("使用session进行一般的session值操作")])]),s._v(" "),a("div",{staticClass:"language-Go extra-class"},[a("pre",{pre:!0,attrs:{class:"language-go"}},[a("code",[s._v("\n\t"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v('//获取session值，类似PHP中的$_SESSION["count"]')]),s._v("\n\tsess"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("Get")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"count"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\t\n\t"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//设置session值")]),s._v("\n\tsess"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("Set")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"count"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" intcount"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])])]),a("p",[s._v("从上面代码可以看出基于beego框架开发的应用中使用session相当方便，基本上和PHP中调用"),a("code",[s._v("session_start()")]),s._v("类似。")]),s._v(" "),a("h2",{attrs:{id:"links"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#links"}},[s._v("#")]),s._v(" links")]),s._v(" "),a("ul",[a("li",[a("RouterLink",{attrs:{to:"/编程语言/Go/preface.html"}},[s._v("目录")])],1),s._v(" "),a("li",[s._v("上一节: "),a("RouterLink",{attrs:{to:"/编程语言/Go/14.1.html"}},[s._v("静态文件支持")])],1),s._v(" "),a("li",[s._v("下一节: "),a("RouterLink",{attrs:{to:"/编程语言/Go/14.3.html"}},[s._v("表单及验证支持")])],1)])])}),[],!1,null,null,null);t.default=e.exports}}]);