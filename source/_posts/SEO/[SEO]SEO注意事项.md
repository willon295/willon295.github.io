---
title: '[SEO]SEO注意事项'
category: SEO
tag: SEO
date: 2016-10-22 03:22:00
---

## sitemap.xml 

文章url不能含有 `&` 符号， 需要转义成 `&amp;` ,否则报错,搜索引擎也会解析失败
```
EntityRef: expecting ';'错误
```



## URl

1. 不能含有 `&` 符号
2. 目标资源最好不要 超过 4 级，如
```
//这样的 URL 对搜索引擎来说并不友好
domain/2017/04/21/Java/[Java]00_XXX

//可以考虑改成
domain/Java/[Java]00_XXX

//或者
domain/?p=155
```

## 自主推送

想要提高站点的索引量和展示量，必须将文章推送给搜索引擎
