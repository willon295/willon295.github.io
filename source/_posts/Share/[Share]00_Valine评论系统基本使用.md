---
title: '[Share]00_静态网站优化之Valine评论系统'
category: 分享
tag: 分享
date: 2018-03-29 12:00:00
---




# What's Valine?

当初搭建博客时，想访问速度快，想快那静态文件最快了，于是选了Hexo构建静态博客，那么问题来了，静态博客是没有后端的，
也就是说无法添加评论。如果想实现，就得依赖第三方评论系统。但是自己的评论数据存在别人的数据库，总感觉不那么靠谱。所以我们需要一个无后端的评论系统
[Valine官网](https://valine.js.org/)，作者自述：Valine 是一款基于 `Leancloud` 的快速、简洁且高效的无后端评论系统。

# NexT主题使用Valine

NexT主题的最新版已经支持该评论系统，默认没有启动

## 准备工作

1. Valine.min.js
下载[Valine.min.js](https://raw.githubusercontent.com/xCss/Valine/master/dist/Valine.min.js)，放入 `主题/source/js/src/` 目录
2. LeanCloud
- 注册账号 -> 创建应用  -> 应用  -> 设置 -> 复制下  `appid` 、`appkey` 
- 安全中心 -> 添加域名限制 (为了安全和防止恶意提交)

## 启用Valine

主要修改一下配置文件

1. `themes/next/layout/_third-party/comments/valine.swig`
```
{% if theme.valine.enable and theme.valine.appid and theme.valine.appkey %}
  <script src="https://cdn1.lncld.net/static/js/3.0.4/av-min.js"></script>
  <script src="/js/src/Valine.min.js"></script>
  
  <script type="text/javascript">
    new Valine({
		av: AV,
        el: '#comments' ,
        verify: {{ theme.valine.verify }},
        notify: {{ theme.valine.notify }},
        appId: '{{ theme.valine.appid }}',
        appKey: '{{ theme.valine.appkey }}',
		placeholder: '{{ theme.valine.placeholder }}',
        avatar: 'hide',
        guest_info: ['nick'],
        pageSize:'{{ theme.valine.pageSize }}' || 10,
    });
  </script>
{% endif %}
```
2. `themes/next/_config.yml`
```
valine:
  enable: true
  appid: XXXXXXXXXXX # leancloud application appid
  appkey: Rr16HzzMSYzQoUujCx9Tt69v # leancloud application appkey
  notify: false # mail notifier
  verify: false # Verification code
  pageSize: 10 # pagination size
  placeholder: 说点什么吧 # comment box placeholder
```
