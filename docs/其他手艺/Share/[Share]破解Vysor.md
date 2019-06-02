---
title: '[Share]破解Vysor'
tag: Share
category: Share
date: 2018-09-21 00:00:00
---


在chrome 插件目录下找到 `uglify.js` ，然后去混淆(网上搜一下js去混淆)，然后搜索licensed，找到

```
function LicenseManager() {
this.licensed = false;
this.licenseCached = false
}
```

然后把上面两个false改成true就好了，更新后要重新破解。