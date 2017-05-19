---
title: '[Android]详解Activity'
tags:
  - Android
id: 260
categories:
  - Android
date: 2017-03-03 22:40:04
---

Activity：四大组件之一

## 生命周期

- `onCreate()`  被创建，在此方法内完成活动的初始化，加载布局，绑定事件。

- `onStart()`  此方法在活动获得焦点时调用

- `onResume()` 此方法在活动准备好与用户交互时调用

- `onPause()`  活动失去焦点，或者系统准备启动其他活动时调用

- `onStop()`  活动不可见的时候调用

- `onDestroy()`  活动被销毁之前调用，之后活动变成 销毁状态

- `onRestart()` 活动重新获取焦点之后调用

### 两种跳转方式

1. 显示跳转

		Intent intent =new Intent (FirstActivity.this, SecondActivity.class);		startActivity(intent);

2. 隐式跳转

	隐式跳转Intent 不指出启动哪一个活动，而是指定一系列更为抽象的action和category等信息，然后交由系统分析这个Intent ，帮我们找到合适的Activity去启动
	**在AndroidMainfest.xml中进行配置**


		<activity android:name=". SecondActivity">		<intent-filter>		<action android:name="package.activitytest.ACTION_START"/>		<category android:name="android.intent.category.DEFAULT"/>		//上面的是默认的 category		<category android:name="package.activitytest.MY_CATEGORY"/>		//<data android:scheme="http" /> 行代码可以让该activity处理 http协议的intent		//这是自定义的category		</intent-filter>		</activity >		只有action和category相同的 活动才能响应该intent		Intent intent =new Intent("package.activitytest.ACTION_START");		intent.addCategory("package.activitytest.MY_CATEGORY");


### 四种启动模式

1. standard
	默认情况下启动方式就是这种模式，活动被启动就返回栈入栈，并处于栈顶。


		Intent intent =new Intent(FirstActivity.this ,FirstActivity.class);		startActivity(intent);		#如果这个intent 被触发 3次，则会new 出三个activity实例，需按三次back才能结束程序


2. singleTop
	运行机制：
	启动时new 一个实例，处于栈顶，
	- 如果FirstActivity--&gt;FirstActivity  不会new实例；直接调用之前的activity实例；
	- 如果FirstActiviy--&gt;SencondActivity--&gt;FirstActiviy，则会new出两个 实例，结束程序需结束三个实例
	首先在清单文件中进行配置

		  <activity android:name=". FirstActivity"
		  android:launchMode="singleTop">
		  <intent-filter>
		  <action android:name="package.activitytest.ACTION_START"/>
		  <category android:name="android.intent.category.DEFAULT"/>
		  </intent-filter>
		  </activity>

3. singleTask

	每个不同的activity 启动时 都会new 一个实例，再次启动时都会在栈内检查是否存在该活动实例，存在不new，不存在new ,也就是说每个activity都只有一个实例

		<activity android:name=". FirstActivity"		android:launchMode="singleTask">		</activity>

4. singleInstance

	被指定为此模式的activity会**启动一个新的返回栈，**这样做的好处是可以其他应用调用。

		<activity android:name=". SecondActivity"		android:launchMode="singleInstance">		</activity>

	大概过程是：

	FirstActivity--&gt;SecondActivity(启动里一个栈保存)

	想结束程序的时候就必须清空两个栈的实例；

	所以要按两次 back