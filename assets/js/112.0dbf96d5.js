(window.webpackJsonp=window.webpackJsonp||[]).push([[112],{453:function(e,s,t){"use strict";t.r(s);var a=t(13),r=Object(a.a)({},(function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"user-objects"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#user-objects"}},[e._v("#")]),e._v(" user_objects")]),e._v(" "),t("ol",[t("li",[e._v("查看用户有哪些表")])]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("select  object_name from user_objects where object_type ='TABLE';\nselect tname from tab;\n")])])]),t("h1",{attrs:{id:"user-constraints"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#user-constraints"}},[e._v("#")]),e._v(" user_constraints")]),e._v(" "),t("ol",[t("li",[e._v("查看 "),t("code",[e._v("当前用户")]),e._v("  ，"),t("code",[e._v("某个表")]),e._v(" 所有的 "),t("code",[e._v("约束名")]),e._v(" 和 "),t("code",[e._v("约束类型")])])]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("select  constraint_name , constraint_type from user_constraints where table_name='S_EMP';\n// C => not null , P => PK , R => FK\n")])])]),t("h1",{attrs:{id:"user-cons-columns"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#user-cons-columns"}},[e._v("#")]),e._v(" user_cons_columns")]),e._v(" "),t("p",[e._v("当用户使用的是系统提供的约束名时，查看用户的 "),t("code",[e._v("某表的列")]),e._v(" 和 "),t("code",[e._v("对应的约束")]),e._v("，可通过此表查询到 某表 的 某列 对应的约束名")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("select constraint_name,column_name from user_cons_columns where table_name='S_EMP';\n")])])])])}),[],!1,null,null,null);s.default=r.exports}}]);