(window.webpackJsonp=window.webpackJsonp||[]).push([[348],{377:function(n,t,a){"use strict";a.r(t);var e=a(13),s=Object(e.a)({},(function(){var n=this,t=n.$createElement,a=n._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[a("p",[n._v("首先最简单的是交互环境下键盘输入")]),n._v(" "),a("p",[a("code",[n._v("raw_input('请输入：')")])]),n._v(" "),a("p",[n._v("当执行到这一行的时候，系统会进入等待状态。用户输入并且回车之后结束等待，继续执行")]),n._v(" "),a("h2",{attrs:{id:"文件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#文件"}},[n._v("#")]),n._v(" 文件")]),n._v(" "),a("p",[n._v("先最好申明编码格式")]),n._v(" "),a("p",[a("code",[n._v("# -*- coding: UTF-8 -*-")])]),n._v(" "),a("h3",{attrs:{id:"打开和关闭文件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#打开和关闭文件"}},[n._v("#")]),n._v(" 打开和关闭文件")]),n._v(" "),a("p",[n._v("举个栗子")]),n._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v('    # -*- coding: UTF-8 -*-\n    # 打开, wb为打开模式（可写，二进制）\n    fo = open("foo.txt", "wb")\n    print("文件名:",fo.name)\n    print("是否已关闭:",fo.closed)\n    print("访问模式:",fo.mode)\n    print("末尾是否强制加空格:",fo.softspace)\n    #关闭电影\n    fo.close()\n     \n\n    #运行结果\n\n     文件名:  foo.txt\n    是否已关闭 :  False\n    访问模式 :  wb\n    末尾是否强制加空格 :  0\n\n')])])]),a("h3",{attrs:{id:"write-方法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#write-方法"}},[n._v("#")]),n._v(" write()方法")]),n._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v('    #举个栗子\n\n    # -*- coding: UTF-8 -*-\n\n    # 打开一个文件\n    # w+:写权限，不存在则创建该文件\n    fo = open("foo.txt", "w+")\n    fo.write( "hello\\nworld!");\n\n    # 关闭打开的文件\n    fo.close()\n     \n')])])]),a("h3",{attrs:{id:"read-方法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#read-方法"}},[n._v("#")]),n._v(" read()方法")]),n._v(" "),a("p",[a("code",[n._v("fileObject.read([num])")]),n._v(": num为读取的总字节数，不传则读到最后一个")]),n._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v('    #举个栗子\n\n    # -*- coding: UTF-8 -*-\n\n    # 打开一个文件,r权限\n    fo = open("foo.txt", "r")\n\n    #读取文件\n    str1 = fo.read()\n    print(str1)\n\n    # 关闭打开的文件\n    fo.close()\n   \n    #运行结果\n\n    hello\n    world!\n')])])])])}),[],!1,null,null,null);t.default=s.exports}}]);