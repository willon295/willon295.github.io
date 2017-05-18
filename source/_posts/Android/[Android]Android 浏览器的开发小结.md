---
title: '[Android WebView]Android 浏览器的开发小结'
tags:
  - Android
id: 232
categories:
  - 安卓
date: 2017-01-17 12:37:28
---

# Webview

webview  是安卓自带的一个 加载网页的 组件，拿这个 开发浏览器还是挺麻烦的。主要开发步骤：

1、在xml布局文件中添加一个webview组件，给它一个 ID。

2、在activity中用 findViewById找到并初始化该组件。
<pre>3、webview.getSettings.setJavaScriptEnnable(true)
//支持js
webview.loadurl("http://www.baidu.com/");
//加载相应的网页
webview.setWebViewClient(new  WebViewClient());
webvie.setWebViewChromeClient(new  WebViewChromeClient());
//本应用的webview中加载网页，而不会跳转至第三方浏览器加载

</pre>
4、在清单文件中添加网络权限；

5、Run....你会发现他只会加载“百度”，如果想加载自定义的网页，加个EditText,把url地址换成EditText文本内容就行了。

6、如果想播放视频，自带的webview播放是特别卡的，所以这个时候要使用硬件加速，在清单文件&lt;application&gt;或者是&lt;activity&gt;中进行 配置
<pre>android:hardwareAccelerated="true"

</pre>
7、全屏播放貌似是个 问题，只会让视频窗口单独获得焦点，但是还是原来的比例，并没有横屏然后铺满屏幕。

# 一、Android之WebViewClient与WebChromeClient的区别

<div>
<div>ANDROID应用开发的时候可能会用到WEBVIEW这个组件，使用过程中可能会接触到WEBVIEWCLIENT与WEBCHROMECLIENT，那么这两个类到底有什么不同呢？</div>
<div>WebViewClient主要帮助WebView处理各种通知、请求事件的，比如：</div>
<div>onLoadResource</div>
<div>onPageStart</div>
<div>onPageFinish</div>
<div>onReceiveError</div>
<div>onReceivedHttpAuthRequest</div>
<div>WebChromeClient主要辅助WebView处理Javascript的对话框、网站图标、网站title、加载进度等比如</div>
<div>onCloseWindow(关闭WebView)</div>
<div>onCreateWindow()</div>
<div>onJsAlert (WebView上alert无效，需要定制WebChromeClient处理弹出)</div>
<div>onJsPrompt</div>
<div>onJsConfirm</div>
<div>onProgressChanged</div>
<div>onReceivedIcon</div>
<div>onReceivedTitle</div>
<div>看上去他们有很多不同，实际使用的话，如果你的WebView只是用来处理一些html的页面内容，只用WebViewClient就行了，如果需要更丰富的处理效果，比如JS、进度条等，就要用到WebChromeClient。</div>
<div>更多的时候，你可以这样</div>
<div></div>
<div>WebView webView;</div>
<div>webView= (WebView) findViewById(R.id.webview);</div>
<div>webView.setWebChromeClient(new WebChromeClient());</div>
<div>webView.setWebViewClient(new WebViewClient());</div>
<div>webView.getSettings().setJavaScriptEnabled(true);</div>
<div>webView.loadUrl(url);</div>
<div>这样你的WebView理论上就能有大部分需要实现的特色了</div>
<div>当然，有些更精彩的内容还是需要你自己添加的</div>
<div></div>
<div>二、**WebViewClient的方法说明**</div>
<div></div>
<div>1、public boolean shouldOverrideUrlLoading(WebView view, String url) {
view.loadUrl(url);
return true;
}
在点击请求的是链接是才会调用，重写此方法返回true表明点击网页里面的链接还是在当前的webview里跳转，不跳到浏览器那边。
2、public void onReceivedSslError(WebView view, SslErrorHandler handler, android.net.http.SslError error) {
handler.proceed();
}
重写此方法可以让webview处理https请求。
3、public boolean shouldOverrideKeyEvent(WebView view, KeyEvent event) {
return super.shouldOverrideKeyEvent(view, event);
}
}
重写此方法才能够处理在浏览器中的按键事件。
4、 public void onLoadResource(WebView view, String url) {
// TODO Auto-generated method stub
if (DEBUG) {
Log.d(TAG, " onLoadResource ");
}
super.onLoadResource(view, url);
}
在加载页面资源时会调用，每一个资源（比如图片）的加载都会调用一次。
5、 public void onPageStarted(WebView view, String url, Bitmap favicon) {
// TODO Auto-generated method stub
if (DEBUG) {
Log.d(TAG, " onPageStarted ");
}
if (url.endsWith(".apk")) {
download(url);//下载处理
}
super.onPageStarted(view, url, favicon);
}
在页面加载开始时调用。
6、public void onPageFinished(WebView view, String url) {
// TODO Auto-generated method stub
if (DEBUG) {
Log.d(TAG, " onPageFinished ");
}
super.onPageFinished(view, url);
}
在页面加载结束时调用。</div>
</div>

# 二、TBS-X5内核

[TBS-X5](http://x5.tencent.com/)是一款腾讯的浏览器内核；

安卓自带的webkit有很多不足的地方，比如加载卡顿，html5网页游戏 fps 不稳定，还被曝光有安全漏洞。

听说腾讯的x5内核不错，至少在腾讯app中都是用x5的，X5的使用简单步骤：

1、下载jar包，[点这里](http://res.imtt.qq.com/TES/tbs_sdk_thirdapp_v2.6.0.1045_36900.zip)；然后申请接入账号-&gt;根据提示填写应用名称-&gt;复制APPkey

2、把jar包添加到项目

3、xml配置网络权限，添加&lt;meta andriod: APPSDKey:你的key&gt;

4、替换webview组件
<pre>&lt;com.tencent.smtt.sdk.WebView
android:id="@+id/forum_context"
android:layout_width="fill_parent"
android:layout_height="fill_parent"
android:paddingLeft="5dp"
android:paddingRight="5dp" /&gt;

</pre>
5、修改导入的类为tbs的类

&nbsp;

&nbsp;