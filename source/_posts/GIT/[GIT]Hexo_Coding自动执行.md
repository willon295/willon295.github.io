---
title: '[GIT]Coding_Hexo伪自动部署'
tag: git
category: git
date: 2016-05-17 19:39:40
---

## 痛苦来源

每次写文章要做那么多事

```
git add .

git  commit   -am "update docs"

git push 

hexo g

hexo d 
```




## 主要功能 

本地写`.md`文章之后，执行`post.sh` ，自动完成
- 生成静态页面
- 推送并更新`github page`（或者`coding page`）
- 推送博客文章源码到远程仓库

## 动机

动机当然是解决那些痛苦了
### 谈谈`github+TravisC`
本人认为最好的`Hexo`自动部署方案就是 `github+TravisCI`

1. `githu+TravisCI`优点
	1. 无需安装`Nodejs`
	2. 无需安装`Hexo`
	3. 只需管理文章源文件<br><br>

2. `githu+TravisCI`不足
	1. 无法本地灵活调试`Hexo`
	2. TravisCI容易部署失败，原因各种各样，文章的一个标点都会让一次部署失败，排错较难
	3. `github page`已屏蔽百度`spider`,所以不利于网站收录
	4. 访问速度没国内`coding`快


于是决定想个办法实现`coding`自动部署`Hexo`。


## Do it

### 准备工作

1. 安装`Hexo`,`Nodejs`
2. 添加空分支`blog-source`,用于存放源文件
3. 修改`config.yml`，修改静态文件的推送分支为`master`

	```
	deploy:
	type: git
	repo: git@git.coding.net:willon/willon.coding.me.git
	branch: master
	```

### 添加脚本

`post.sh`文件内容

```
#确定当前目录为hexo工作根目录
echo  -e "\033[32;49;1m [正在提交新文章]"
git  add  .
git  commit  -am "Update Docs"
echo -e "\033[32;49;1m 提交成功，正在推送至远程仓库...\033[39;49;0m"
git  push origin blog-source
echo -e  "\033[32;49;1m 源文件推送成功...\033[39;49;0m"
echo  -e  "\033[32;49;1m 正在生成静态页面...\033[39;49;0m"
hexo g
echo -e "\033[32;49;1m 正在推送静态页面...\033[39;49;0m"
hexo d
echo  -e "\033[32;49;1m 全部搞定！！！\033[39;49;0m"
```

### 开心的写文章

- 写一篇`.md`文章
- 执行

	```
	sh post.sh
	```
- 收工
