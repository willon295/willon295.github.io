(window.webpackJsonp=window.webpackJsonp||[]).push([[214],{600:function(e,r,s){"use strict";s.r(r);var t=s(13),a=Object(t.a)({},(function(){var e=this,r=e.$createElement,s=e._self._c||r;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h1",{attrs:{id:"选举"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#选举"}},[e._v("#")]),e._v(" 选举")]),e._v(" "),s("p",[e._v("投票基本规则： 只投myid最大的，myid没有比自己大的时，投自己。 大概流程：")]),e._v(" "),s("ol",[s("li",[e._v("启动 zk 服务")]),e._v(" "),s("li",[e._v("获取 myid 内容")]),e._v(" "),s("li",[e._v("第一台启动时发现只有自己，发现没有 id 比自己大的，投票给自己")]),e._v(" "),s("li",[e._v("第二台机器启动时，新的一轮投票开始，都投id最大的，于是第二台 为 "),s("code",[e._v("leader")])]),e._v(" "),s("li",[e._v("第 n 台机器启动，发现已经有 "),s("code",[e._v("leader")]),e._v(" ，自己成为 "),s("code",[e._v("flower")])]),e._v(" "),s("li",[e._v("当 leader 因某种原因挂了， 新的一轮投票开始。")])]),e._v(" "),s("h1",{attrs:{id:"observer模式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#observer模式"}},[e._v("#")]),e._v(" Observer模式")]),e._v(" "),s("p",[e._v("How to use Observers\nSetting up a ZooKeeper ensemble that uses Observers is very simple, and requires just two changes to your config files. Firstly, in the config file of every node that is to be an Observer, you must place this line:")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("peerType=observer\n")])])]),s("p",[e._v("This line tells ZooKeeper that the server is to be an Observer. Secondly, in every server config file, you must add :observer to the server definition line of each Observer. For example:")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("server.1:localhost:2181:3181:observer\n")])])])])}),[],!1,null,null,null);r.default=a.exports}}]);