(window.webpackJsonp=window.webpackJsonp||[]).push([[115],{458:function(t,e,a){"use strict";a.r(e);var n=a(13),r=Object(n.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"一般步骤"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#一般步骤"}},[t._v("#")]),t._v(" 一般步骤")]),t._v(" "),a("h2",{attrs:{id:"准备"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#准备"}},[t._v("#")]),t._v(" 准备")]),t._v(" "),a("p",[a("strong",[t._v("驱动包")])]),t._v(" "),a("p",[t._v("一般在 "),a("code",[t._v("$ORACLE_HOME/jdbc/lib/")]),t._v(" 目录，比如11g存在一个 "),a("code",[t._v("ojdbc6.jar")]),t._v(" 的jar包")]),t._v(" "),a("p",[a("strong",[t._v("把jar包安装到本地maven仓库")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("mvn install:install-file -DgroupId=myOracle  -DartifactId=ojdbc6 -Dversion=11.2.0 -Dpackaging=jar -Dfile=ojdbc6.jar\n")])])]),a("p",[a("strong",[t._v("启动oracle实例以及监听")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("$ sqlpus / as sysdba\nSQL> startup\n\n$ lsnrctl  start\n")])])]),a("p",[a("strong",[t._v("driver叫什么？jdbcUrl怎么写？")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("driver=oracle.jdbc.driver.OracleDriver\njdbcUrl=jdbc:oracle:thin:@127.0.0.1:1521:oracleSID\n")])])]),a("h2",{attrs:{id:"注意事项"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#注意事项"}},[t._v("#")]),t._v(" 注意事项")]),t._v(" "),a("ol",[a("li",[t._v("SQL语句不能有结束符 "),a("code",[t._v(";")]),t._v(" 分号，否则报错 "),a("code",[t._v("无效字符")])]),t._v(" "),a("li",[t._v("如果出现 "),a("code",[t._v("connect refused")]),t._v(", 检查用户名密码，是否启动监听")]),t._v(" "),a("li",[t._v("如果出现 "),a("code",[t._v("TNS:listener does not currently know of SID given in connect descriptor")]),t._v("，说明监听配置不正确，参考第一篇 "),a("code",[t._v("[Oracle]00_安装及启动")])])]),t._v(" "),a("h2",{attrs:{id:"批处理"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#批处理"}},[t._v("#")]),t._v(" 批处理")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('        Connection connction = ConnectionFactory.getConnction();\n        \n        // Statement 的批处理,批处理许多不同的 SQL 语句\n        String sql1 = "INSERT INTO student VALUES(3,\'rose\',\'rosepwd\')";\n        String sql2 = "INSERT INTO student VALUES(4,\'lucy\',\'lucypwd\')";\n        Statement stat = connction.createStatement();\n        stat.addBatch(sql1);\n        stat.addBatch(sql2);\n        stat.executeBatch();\n\n        // PrepareStatement 批处理 适用于相同的语句，不同的参数\n        String sql = "INSERT INTO student VALUES(?,?,?)";\n        PreparedStatement pre = connction.prepareStatement(sql);\n        for (int i = 0; i < 520; i++) {\n            pre.setInt(1, i);\n            pre.setString(2, "user_" + i);\n            pre.setString(3, "" + i + "_pwd");\n            pre.addBatch();\n\n            if (i % 100 == 0) {\n                //每100条记录执行一次\n                pre.executeBatch();\n                //执行完毕，清空缓存池\n                pre.clearBatch();\n            }\n        }\n\n        pre.executeBatch();\n')])])])])}),[],!1,null,null,null);e.default=r.exports}}]);