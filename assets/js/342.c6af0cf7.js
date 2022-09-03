(window.webpackJsonp=window.webpackJsonp||[]).push([[342],{395:function(e,a,t){"use strict";t.r(a);var n=t(13),s=Object(n.a)({},(function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h2",{attrs:{id:"list-列表"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#list-列表"}},[e._v("#")]),e._v(" list[ ]列表")]),e._v(" "),t("p",[e._v("列表，可以填入任何类型数据")]),e._v(" "),t("p",[e._v("举个栗子")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("L = [\"hello\", \"2017\", True]\nprint(L)\n\n#运行结果\n['hello', '2017', True]\n")])])]),t("h2",{attrs:{id:"访问元组"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#访问元组"}},[e._v("#")]),e._v(" 访问元组")]),e._v(" "),t("h3",{attrs:{id:"索引访问"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#索引访问"}},[e._v("#")]),e._v(" 索引访问")]),e._v(" "),t("ol",[t("li",[t("p",[e._v("正常索引")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("    print( L[0] ,L[1] )\n    #运行结果是 hello 2017\n")])])])]),e._v(" "),t("li",[t("p",[e._v("倒序索引")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("    print( L[-1] )\n    #访问倒数第一个，结果 True\n")])])])])]),e._v(" "),t("h3",{attrs:{id:"切片访问"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#切片访问"}},[e._v("#")]),e._v(" 切片访问")]),e._v(" "),t("p",[e._v("举个栗子")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("    str1 = 'abcde'\n\n    #索引 1 之后的所有\n    print(str1[1:])\n\n    #索引 1-4（不包含4）\n    print(str1[1:4])\n\n    #从开头到结尾，进位数为 2\n    print(str1[0:4:2])\n\n    #倒序访问,不包含-4\n    print(str1[-4:-1])\n     \n\n    运行结果\n    bcde\n    bcd\n    ace\n    bcd\n")])])]),t("h2",{attrs:{id:"元素操作"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#元素操作"}},[e._v("#")]),e._v(" 元素操作")]),e._v(" "),t("h3",{attrs:{id:"添加元素"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#添加元素"}},[e._v("#")]),e._v(" 添加元素")]),e._v(" "),t("ol",[t("li",[t("code",[e._v("append(value)")]),e._v(" :末尾添加")]),e._v(" "),t("li",[t("code",[e._v("insert(index，value)")]),e._v(" 在索引处插入,之后的元素自动后移")])]),e._v(" "),t("p",[e._v("举个栗子")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("    L = [\"hello\", \"2017\", True]\n    print(L)\n    L.append(\"Append A\")\n    print(L)\n    L.insert(0,\"Insert A\")\n    print(L)\n     \n\n    运行结果\n\n    ['hello', '2017', True]\n    ['hello', '2017', True, 'Append A']\n    ['Insert A', 'hello', '2017', True, 'Append A']\n")])])]),t("h3",{attrs:{id:"删除元素"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#删除元素"}},[e._v("#")]),e._v(" 删除元素")]),e._v(" "),t("p",[e._v("我们可以用以下两种方法删除元素：")]),e._v(" "),t("ul",[t("li",[t("code",[e._v("pop (index)")]),e._v(" : 根据"),t("code",[e._v("索引")]),e._v("删除元素")]),e._v(" "),t("li",[t("code",[e._v("remove(value)")]),e._v(" ： 根据"),t("code",[e._v("值")]),e._v("删除元素")])]),e._v(" "),t("p",[e._v("举个栗子")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('    L = ["hello", "2017", True]\n    print(L)\n    L.pop(1)\n    print(L)\n    L.remove(\'2017\')\n    print(L)\n     \n\n    #运行结果\n\n    ["hello", "2017", True]\n    ["hello",  True]\n    ["hello"]\n')])])]),t("blockquote",[t("p",[e._v("注意： 删除一个元素之后，列表刷新。删除的元素之后的元素索引改变")])]),e._v(" "),t("h3",{attrs:{id:"替换元素"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#替换元素"}},[e._v("#")]),e._v(" 替换元素")]),e._v(" "),t("p",[e._v("可以直接根据元素的索引 ，重新赋值即可；")]),e._v(" "),t("p",[e._v("举个栗子")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('    L = ["hello", "2017", True]\n    L[1]=\'Python\'\n    print(L)\n     \n\n    #运行结果\n\n    ["hello", "Python", True]\n     \n')])])]),t("h2",{attrs:{id:"元组-tuple"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#元组-tuple"}},[e._v("#")]),e._v(" 元组( )tuple")]),e._v(" "),t("p",[t("code",[e._v("tuple")]),e._v(" 是python中的一种有序列。")]),e._v(" "),t("h3",{attrs:{id:"基本特征"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#基本特征"}},[e._v("#")]),e._v(" 基本特征")]),e._v(" "),t("ol",[t("li",[t("p",[e._v("用 "),t("code",[e._v("()")]),e._v(" 创建，而不用 "),t("code",[e._v("[]")])])]),e._v(" "),t("li",[t("p",[e._v("一旦创建并且赋值，不可修改。只能访问")])]),e._v(" "),t("li",[t("p",[e._v("创建的元素只包含1个元素，且为整数。结果为整数")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("\t#举个栗子\n\n    t = (55)\n    print（t）\n    t1 = (55,)\n    print(t1)\n\n    #运行结果\n\n    55\n    (55,)\n")])])])])]),e._v(" "),t("blockquote",[t("p",[e._v("原因："),t("code",[e._v("()")]),e._v(" 是优先级运算符，经过解释器解释后 "),t("code",[e._v("(55)")]),e._v(" 的运算结果为 "),t("code",[e._v("55")])])]),e._v(" "),t("h3",{attrs:{id:"可变-tuple"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#可变-tuple"}},[e._v("#")]),e._v(" “可变” tuple?")]),e._v(" "),t("p",[t("code",[e._v("tuple")]),e._v(" 的不可改变是说"),t("code",[e._v("每个元素的指向不可改变")]),e._v("，如果"),t("code",[e._v("tuple")]),e._v("中有一个元素是列表。那么这个元素是可改变的。")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("    #举个栗子\n\n    L=[\"hello\",2017]\n    t = (55,'dddd',L)\n    print(t)\n    L.pop(1)\n    print(t)\n     \n    #运行结果\n\n    (55, 'dddd', ['hello', 2017])\n    (55, 'dddd', ['hello'])\n     \n")])])]),t("h2",{attrs:{id:"dict-字典"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#dict-字典"}},[e._v("#")]),e._v(" dict{ }字典")]),e._v(" "),t("p",[e._v("字典用 "),t("code",[e._v("{}")]),e._v(" 创建，元素以键值对('key--\x3evalue')的方式"),t("code",[e._v("无序存储")]),e._v(",通过可以获取到相应的值")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("    #举个栗子\n    dd={'name': 'chen'，'sex': 'man', 'age': 23 }\n    print(d)\n    print(dd['name'])\n     \n\n    #运行结果\n    {'sex': 'man','name': 'chen'， 'age': 23 }\n    chen\n")])])]),t("h3",{attrs:{id:"遍历字典"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#遍历字典"}},[e._v("#")]),e._v(" 遍历字典")]),e._v(" "),t("ol",[t("li",[t("p",[e._v("仅用"),t("code",[e._v("key")]),e._v(" 遍历")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("    #举个栗子\n    d = {'sex': 'man','name': 'chen'，'age': 23 }\n    for k in d:\n        print d[k]\n     \n    #运行结果\n    chen\n    man\n    23\n \n")])])])]),e._v(" "),t("li",[t("p",[t("code",[e._v("key")]),e._v("、"),t("code",[e._v("value")]),e._v(" 遍历")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("    #举个栗子\n    d = {\n            'sex': 'man','name': 'chen'，'age':'23 '\n            }\n    for k ,v in d.items()\n        print(k+'--\x3e;'+v)\n\n    #运行结果\n    name--\x3e;chen\n    sex--\x3eman\n    age--\x3e23\n")])])])])])])}),[],!1,null,null,null);a.default=s.exports}}]);