---
title: '[Vue]Vuepress自动生成侧边栏目'
---


vuepress 是当下又一个较为火热的项目,  主要的作用是类似于模板引擎 , 实现将 markdown 文档转化成 html 文件, 并构建一个较为完整的站点.
对刚刚搭建博客的站长来说, 根据官网配置站点, 或许并不是一件麻烦事, 但是对于站点迁移的我来说, 配置各种导航是一项很蠢的事, 何其复杂的文件分类, 何其多的导航,文件归档.
本文旨在使得 vuepress 根据文档目录结构, 自动生成 `导航栏` , `侧边栏` .


工程目录结构大概如下:
```
|--project
	|--docs/       	 // 文档存放处
	|----.vuepress/
				|--config.js
	|--package.json
```



本文件 `config.js` 位于  `工程/.vuepress/config.js`

```JavaScript
/**
 * create by Willon
 * date: 2019-05-12
 */

/**
 * 主要实现:
 *
 * 1. 文件目录结构 --> 导航栏结构  (每个顶级父目录为 nav 标题,  子目录为下拉列表)
 * 2. 文本文档 ---> 侧边栏导航结构  (每个最低级子目录对应一个页面, 对应一个sidebar)
 */


/**
 * 修改配置, 直接修改 config 对象即可
 *
 * 1. 站点LOGO
 * 2. 服务器端口
 * 3. 主题配置: 侧边栏 , 导航条
 * 4. Other ...
 */

const fs = require('fs');
const path = require("path");
const rootpath = path.dirname(__dirname);

const filehelper = {
    getAllFiles: function (rpath) {
        let filenames = [];
        fs.readdirSync(rpath).forEach(file => {
            fullpath = rpath + "/" + file;
            var fileinfo = fs.statSync(fullpath);
            if (fileinfo.isFile()) {
                if (file === 'README.md' || file === 'readme.md') {
                    file = '';
                } else {
                    file = file.replace('.md', '');
                }
                filenames.push(file);
            }
        });
        filenames.sort();
        return filenames;
    },
    getAllDirs: function getAllDirs(mypath = '.') {
        const items = fs.readdirSync(mypath);
        let result = [];
        // 遍历当前目录中所有文件夹
        items.map(item => {
            let temp = path.join(mypath, item);
            if (fs.statSync(temp).isDirectory() && !item.startsWith(".")) {
                let path = mypath + "/" + item + "/";
                result.push(path);
                result = result.concat(getAllDirs(temp));
            }

        });
        return result;
    },

};
// nav的链接路径
var navLinks = [];
var sidebar = {};
var nav = getNav();

function genSideBar() {
    var sidebars = {};
    var allDirs = filehelper.getAllDirs(rootpath);
    allDirs.forEach(item => {
        let dirFiles = filehelper.getAllFiles(item);
        let dirname = item.replace(rootpath, "");
        navLinks.push(dirname);
        if ((dirFiles.length > 1)) {
            sidebars[dirname] = dirFiles;
        }

    });

    sidebar = sidebars
}

/**
 * 先生成所有nav文件链接;
 * @param filepaths
 * @returns {Array}
 */
function genNavLink(filepaths) {
    genSideBar();
    var navLinks = [];
    filepaths.forEach(p => {
        var ss = p.toString().split("/");
        var name = ss[ss.length - 2];
        var parent = p.replace(name + "/", "");
        navLinks.push({
            text: name,
            link: p,
            items: [],
            parent: parent
        });

    });

    return navLinks;

}


/**
 * 自定义排序文件夹
 * @param a
 * @param b
 * @returns {number}
 */
function sortDir(a, b) {
    let al = a.parent.toString().split("/").length;
    let bl = b.parent.toString().split("/").length;
    if (al > bl) {
        return -1;
    }
    if (al === bl) {
        return 0;
    }
    if (al < bl) {
        return 1;
    }
}


/**
 * 生成最终的 nav配置信息
 * @param navLinks
 * @returns {Array}
 */

function getNav() {
    let nnavs = genNavLink(navLinks);
    nnavs.sort(sortDir);
    var iniMap = {};
    var result = [];
    var delMap = {};
    nnavs.forEach(l => {
        iniMap[l.link] = l;
    });
    nnavs.forEach(l => {
        var parentLink = l.parent;
        if (parentLink !== "/") {
            iniMap[parentLink].items.push(l);
            delMap[l.link] = l;
        }
    });
    for (var k in iniMap) {
        if (delMap[k] != null) {
            delete iniMap[k];
            continue;
        }
        result.push(iniMap[k])
    }

    return result;
}

var config = {
    title: 'Willon',
    themeConfig: {
        sidebar: sidebar,
        nav: nav
    }
};


module.exports = config;

```





为了方便调试 , 在 `工程目录` 配置 `package.json`

```json

{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}

```
