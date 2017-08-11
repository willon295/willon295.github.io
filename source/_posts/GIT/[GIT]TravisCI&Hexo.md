---
title: 'github + TravisCI实现hexo自动部署'
tags:
  - github
  - TravisCI
category: github
id: 8
---

`github` + `TravisCI`实现 `hexo`博客自动部署，先看不同

## 一、hexo+github
### 发布文章
1. 本地安装`hexo` ， `Nodejs`
2. 写`.md`文章
3. `hexo g`生成静态`index.html`文件
4. `hexo d` 发布文章到`github`

### 管理文章 
1. `git add 文章`
2. `git push `

### 后期维护
- `.md`文章与`hexo`生成的静态文件分开管理
- 安装`nodejs`和`hexo`
- `git  clone 博客源文件`

## 二、TravisCI+github
### 发布文章

1. 写`.md`文章
2. `git add 文章`
3. `git  push ` 文章

> 博客静态页面等待TravisCI由完成

### 后期维护

- `git  clone  博客源文件`

## 三、优劣势对比
1. 优点
	- 方便，只需管理文章即可
	- 生成和发布静态页面自动完成
	- 后期维护简单
2. 缺点
	- 无法本地灵活完成`hexo`相关操作
	- 如果博客有第三方`cdn`图床，发布文章比较麻烦

## 四、部署github+TravisCI
### github操作


1. 在`username.github.io`项目添加一个`blog-source`空分支
2. `push`本地`hexo`博客源文件至 `blog-source`分支
3. 在项目的根目录添加一个`.travis.yml`配置文件.内容：
```
		language: node_js
		node_js: stable
		
		#S: Build Lifecycle
		install:
		  - npm install
		
		#before_script:
		 #- npm install -g gulp
		
		script:
		  - hexo clean
		  - hexo g
		
		after_script:
		  - cd ./public
		  - git init
		  - git config user.name "willon295"
		  - git config user.email "chenlong951126@gmail.com"
		  - git add .
		  - git commit -m "Update docs"
		  - git push --force --quiet "https://${github_token}@${GH_REF}" master:master
		#E: Build LifeCycle
		branches:
		  only:
			#设置博客源码所在分支
		    - blog-source
		env:
		 global:
		   - GH_REF: github.com/willon295/willon295.github.io.git
			#这里是项目地址
```
4. 在`setting`里添加一个`token_key`，复制（备用）

### TravisCI操作

1. 直接用`github`账号登录
2. 同步项目
3. 添加一个工程，继承`github`某一个项目
4. 点击工程的设置，设置执行脚本的`条件`和操作`github`项目`权限`。
5. 在设置里添加一个 环境变量，粘贴`tokenkey`命名为 `github_token`


## 测试

- 写文章 `push`之后即可，等待`TravisCI`完成所有操作之后，文章更新