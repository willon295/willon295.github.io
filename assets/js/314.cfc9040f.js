(window.webpackJsonp=window.webpackJsonp||[]).push([[314],{460:function(t,s,n){"use strict";n.r(s);var a=n(13),e=Object(a.a)({},(function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h1",{attrs:{id:"_11-3-go怎么写测试用例"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_11-3-go怎么写测试用例"}},[t._v("#")]),t._v(" 11.3 Go怎么写测试用例")]),t._v(" "),n("p",[t._v("开发程序其中很重要的一点是测试，我们如何保证代码的质量，如何保证每个函数是可运行，运行结果是正确的，又如何保证写出来的代码性能是好的，我们知道单元测试的重点在于发现程序设计或实现的逻辑错误，使问题及早暴露，便于问题的定位解决，而性能测试的重点在于发现程序设计上的一些问题，让线上的程序能够在高并发的情况下还能保持稳定。本小节将带着这一连串的问题来讲解Go语言中如何来实现单元测试和性能测试。")]),t._v(" "),n("p",[t._v("Go语言中自带有一个轻量级的测试框架"),n("code",[t._v("testing")]),t._v("和自带的"),n("code",[t._v("go test")]),t._v("命令来实现单元测试和性能测试，"),n("code",[t._v("testing")]),t._v("框架和其他语言中的测试框架类似，你可以基于这个框架写针对相应函数的测试用例，也可以基于该框架写相应的压力测试用例，那么接下来让我们一一来看一下怎么写。")]),t._v(" "),n("p",[t._v("另外建议安装"),n("a",{attrs:{href:"https://github.com/cweill/gotests",target:"_blank",rel:"noopener noreferrer"}},[t._v("gotests"),n("OutboundLink")],1),t._v("插件自动生成测试代码:")]),t._v(" "),n("div",{staticClass:"language-Go extra-class"},[n("pre",{pre:!0,attrs:{class:"language-go"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("go")]),t._v(" get "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("u "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("v github"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("com"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("cweill"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("gotests"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("\n\n")])])]),n("h2",{attrs:{id:"如何编写测试用例"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#如何编写测试用例"}},[t._v("#")]),t._v(" 如何编写测试用例")]),t._v(" "),n("p",[t._v("由于"),n("code",[t._v("go test")]),t._v("命令只能在一个相应的目录下执行所有文件，所以我们接下来新建一个项目目录"),n("code",[t._v("gotest")]),t._v(",这样我们所有的代码和测试代码都在这个目录下。")]),t._v(" "),n("p",[t._v("接下来我们在该目录下面创建两个文件：gotest.go和gotest_test.go")]),t._v(" "),n("ol",[n("li",[t._v("gotest.go:这个文件里面我们是创建了一个包，里面有一个函数实现了除法运算:")])]),t._v(" "),n("div",{staticClass:"language-Go extra-class"},[n("pre",{pre:!0,attrs:{class:"language-go"}},[n("code",[t._v("\n\t"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("package")]),t._v(" gotest\n\t\n\t"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n\t\t"),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"errors"')]),t._v("\n\t"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t\n\t"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("func")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Division")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("a"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" b "),n("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("float64")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("float64")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("error")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" b "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t\t"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" errors"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("New")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"除数不能为0"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t\t"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\t\n\t\t"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" a "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v(" b"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("nil")]),t._v("\n\t"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n")])])]),n("ol",{attrs:{start:"2"}},[n("li",[n("p",[t._v("gotest_test.go:这是我们的单元测试文件，但是记住下面的这些原则：")]),t._v(" "),n("ul",[n("li",[t._v("文件名必须是"),n("code",[t._v("_test.go")]),t._v("结尾的，这样在执行"),n("code",[t._v("go test")]),t._v("的时候才会执行到相应的代码")]),t._v(" "),n("li",[t._v("你必须import "),n("code",[t._v("testing")]),t._v("这个包")]),t._v(" "),n("li",[t._v("所有的测试用例函数必须是"),n("code",[t._v("Test")]),t._v("开头")]),t._v(" "),n("li",[t._v("测试用例会按照源代码中写的顺序依次执行")]),t._v(" "),n("li",[t._v("测试函数"),n("code",[t._v("TestXxx()")]),t._v("的参数是"),n("code",[t._v("testing.T")]),t._v("，我们可以使用该类型来记录错误或者是测试状态")]),t._v(" "),n("li",[t._v("测试格式："),n("code",[t._v("func TestXxx (t *testing.T)")]),t._v(","),n("code",[t._v("Xxx")]),t._v("部分可以为任意的字母数字的组合，但是首字母不能是小写字母[a-z]，例如"),n("code",[t._v("Testintdiv")]),t._v("是错误的函数名。")]),t._v(" "),n("li",[t._v("函数中通过调用"),n("code",[t._v("testing.T")]),t._v("的"),n("code",[t._v("Error")]),t._v(", "),n("code",[t._v("Errorf")]),t._v(", "),n("code",[t._v("FailNow")]),t._v(", "),n("code",[t._v("Fatal")]),t._v(", "),n("code",[t._v("FatalIf")]),t._v("方法，说明测试不通过，调用"),n("code",[t._v("Log")]),t._v("方法用来记录测试的信息。")])]),t._v(" "),n("p",[t._v("下面是我们的测试用例的代码：")])])]),t._v(" "),n("div",{staticClass:"language-Go extra-class"},[n("pre",{pre:!0,attrs:{class:"language-go"}},[n("code",[t._v("\n\t"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("package")]),t._v(" gotest\n\t\n\t"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n\t\t"),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"testing"')]),t._v("\n\t"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t\n\t"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("func")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Test_Division_1")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("t "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("testing"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("T"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" i"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" e "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Division")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("6")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("||")]),t._v(" e "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("nil")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//try a unit test on function")]),t._v("\n\t\t\tt"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Error")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"除法函数测试没通过"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 如果不是如预期的那么就报错")]),t._v("\n\t\t"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t\tt"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Log")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"第一个测试通过了"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//记录一些你期望记录的信息")]),t._v("\n\t\t"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\t"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\t\n\t"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("func")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Test_Division_2")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("t "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("testing"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("T"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\tt"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Error")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"就是不通过"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n")])])]),n("div",{staticClass:"language- extra-class"},[n("pre",[n("code",[t._v("我们在项目目录下面执行`go test`,就会显示如下信息：\n\n\t--- FAIL: Test_Division_2 (0.00 seconds)\n\t\tgotest_test.go:16: 就是不通过\n\tFAIL\n\texit status 1\n\tFAIL\tgotest\t0.013s\n从这个结果显示测试没有通过，因为在第二个测试函数中我们写死了测试不通过的代码`t.Error`，那么我们的第一个函数执行的情况怎么样呢？默认情况下执行`go test`是不会显示测试通过的信息的，我们需要带上参数`go test -v`，这样就会显示如下信息：\n\n\t=== RUN Test_Division_1\n\t--- PASS: Test_Division_1 (0.00 seconds)\n\t\tgotest_test.go:11: 第一个测试通过了\n\t=== RUN Test_Division_2\n\t--- FAIL: Test_Division_2 (0.00 seconds)\n\t\tgotest_test.go:16: 就是不通过\n\tFAIL\n\texit status 1\n\tFAIL\tgotest\t0.012s\n上面的输出详细的展示了这个测试的过程，我们看到测试函数1`Test_Division_1`测试通过，而测试函数2`Test_Division_2`测试失败了，最后得出结论测试不通过。接下来我们把测试函数2修改成如下代码：\n")])])]),n("div",{staticClass:"language-Go extra-class"},[n("pre",{pre:!0,attrs:{class:"language-go"}},[n("code",[t._v("\n\t"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("func")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Test_Division_2")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("t "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("testing"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("T"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("_")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" e "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Division")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("6")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" e "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("nil")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//try a unit test on function")]),t._v("\n\t\t\tt"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Error")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Division did not work as expected."')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 如果不是如预期的那么就报错")]),t._v("\n\t\t"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t\tt"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Log")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"one test passed."')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" e"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//记录一些你期望记录的信息")]),t._v("\n\t\t"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\t"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\t\n")])])]),n("div",{staticClass:"language- extra-class"},[n("pre",[n("code",[t._v("然后我们执行`go test -v`，就显示如下信息，测试通过了：\n\n\t=== RUN Test_Division_1\n\t--- PASS: Test_Division_1 (0.00 seconds)\n\t\tgotest_test.go:11: 第一个测试通过了\n\t=== RUN Test_Division_2\n\t--- PASS: Test_Division_2 (0.00 seconds)\n\t\tgotest_test.go:20: one test passed. 除数不能为0\n\tPASS\n\tok  \tgotest\t0.013s\n")])])]),n("h2",{attrs:{id:"如何编写压力测试"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#如何编写压力测试"}},[t._v("#")]),t._v(" 如何编写压力测试")]),t._v(" "),n("p",[t._v("压力测试用来检测函数(方法）的性能，和编写单元功能测试的方法类似,此处不再赘述，但需要注意以下几点：")]),t._v(" "),n("ul",[n("li",[t._v("压力测试用例必须遵循如下格式，其中XXX可以是任意字母数字的组合，但是首字母不能是小写字母")])]),t._v(" "),n("div",{staticClass:"language-Go extra-class"},[n("pre",{pre:!0,attrs:{class:"language-go"}},[n("code",[t._v("\t"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("func")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("BenchmarkXXX")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("b "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("testing"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("B"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),n("ul",[n("li",[n("code",[t._v("go test")]),t._v("不会默认执行压力测试的函数，如果要执行压力测试需要带上参数"),n("code",[t._v("-test.bench")]),t._v("，语法:"),n("code",[t._v('-test.bench="test_name_regex"')]),t._v(",例如"),n("code",[t._v('go test -test.bench=".*"')]),t._v("表示测试全部的压力测试函数")]),t._v(" "),n("li",[t._v("在压力测试用例中,请记得在循环体内使用"),n("code",[t._v("testing.B.N")]),t._v(",以使测试可以正常的运行")]),t._v(" "),n("li",[t._v("文件名也必须以"),n("code",[t._v("_test.go")]),t._v("结尾")])]),t._v(" "),n("p",[t._v("下面我们新建一个压力测试文件webbench_test.go，代码如下所示：")]),t._v(" "),n("div",{staticClass:"language-Go extra-class"},[n("pre",{pre:!0,attrs:{class:"language-go"}},[n("code",[t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("package")]),t._v(" gotest\n\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n\t"),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"testing"')]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("func")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Benchmark_Division")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("b "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("testing"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("B"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" i "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" b"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("N"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//use b.N for looping ")]),t._v("\n\t\t"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Division")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("func")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Benchmark_TimeConsumingFunction")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("b "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("testing"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("B"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\tb"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("StopTimer")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//调用该函数停止压力测试的时间计数")]),t._v("\n\n\t"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//做一些初始化的工作,例如读取文件数据,数据库连接之类的,")]),t._v("\n\t"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//这样这些时间不影响我们测试函数本身的性能")]),t._v("\n\n\tb"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("StartTimer")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//重新开始时间")]),t._v("\n\t"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" i "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" b"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("N"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Division")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n")])])]),n("p",[t._v("我们执行命令"),n("code",[t._v('go test webbench_test.go -test.bench=".*"')]),t._v("，可以看到如下结果：")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("Benchmark_Division-4   \t                     500000000\t      7.76 ns/op\t     456 B/op\t      14 allocs/op\nBenchmark_TimeConsumingFunction-4            500000000\t      7.80 ns/op\t     224 B/op\t       4 allocs/op\nPASS\nok  \tgotest\t9.364s\n")])])]),n("p",[t._v("上面的结果显示我们没有执行任何"),n("code",[t._v("TestXXX")]),t._v("的单元测试函数，显示的结果只执行了压力测试函数，第一条显示了"),n("code",[t._v("Benchmark_Division")]),t._v("执行了500000000次，每次的执行平均时间是7.76纳秒，第二条显示了"),n("code",[t._v("Benchmark_TimeConsumingFunction")]),t._v("执行了500000000，每次的平均执行时间是7.80纳秒。最后一条显示总共的执行时间。")]),t._v(" "),n("h2",{attrs:{id:"小结"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#小结"}},[t._v("#")]),t._v(" 小结")]),t._v(" "),n("p",[t._v("通过上面对单元测试和压力测试的学习，我们可以看到"),n("code",[t._v("testing")]),t._v("包很轻量，编写单元测试和压力测试用例非常简单，配合内置的"),n("code",[t._v("go test")]),t._v("命令就可以非常方便的进行测试，这样在我们每次修改完代码,执行一下go test就可以简单的完成回归测试了。")]),t._v(" "),n("h2",{attrs:{id:"links"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#links"}},[t._v("#")]),t._v(" links")]),t._v(" "),n("ul",[n("li",[n("RouterLink",{attrs:{to:"/编程语言/Go/preface.html"}},[t._v("目录")])],1),t._v(" "),n("li",[t._v("上一节: "),n("RouterLink",{attrs:{to:"/编程语言/Go/11.2.html"}},[t._v("使用GDB调试")])],1),t._v(" "),n("li",[t._v("下一节: "),n("RouterLink",{attrs:{to:"/编程语言/Go/11.4.html"}},[t._v("小结")])],1)])])}),[],!1,null,null,null);s.default=e.exports}}]);