---
title: HTTP消息机构
tags:
  - HTTP
id: 50
categories:
  - 网站
  - 通信
date: 2016-12-17 23:12:11
---

&nbsp;

# HTTP 消息结构

<div class="tutintro">

HTTP是基于客户端/服务端（C/S）的架构模型，通过一个可靠的链接来交换信息，是一个无状态的请求/响应协议。

一个HTTP"客户端"是一个应用程序（Web浏览器或其他任何客户端），通过连接到服务器达到向服务器发送一个或多个HTTP的请求的目的。

一个HTTP"服务器"同样也是一个应用程序（通常是一个Web服务，如Apache Web服务器或IIS服务器等），通过接收客户端的请求并向客户端发送HTTP响应数据。HTTP使用统一资源标识符（Uniform Resource Identifiers, URI）来传输数据和建立连接。

一旦建立连接后，数据消息就通过类似Internet邮件所使用的格式[RFC5322]和多用途Internet邮件扩展（MIME）[RFC2045]来传送。

### 客户端请求消息

客户端发送一个HTTP请求到服务器的请求消息包括以下格式：请求行（request line）、请求头部（header）、空行和请求数据四个部分组成

### 服务器响应消息

HTTP响应也由四个部分组成，分别是：状态行、消息报头、空行和响应正文。

![](http://oic1wftgk.bkt.clouddn.com/wp-content/uploads/httpmessage.jpg)

### 实例

下面实例是一点典型的使用GET来传递数据的实例：

客户端请求：
<pre class="prettyprint prettyprinted"><span class="pln">GET </span><span class="pun">/</span><span class="pln">hello</span><span class="pun">.</span><span class="pln">txt HTTP</span><span class="pun">/</span><span class="lit">1.1</span>
<span class="typ">User</span><span class="pun">-</span><span class="typ">Agent</span><span class="pun">:</span><span class="pln"> curl</span><span class="pun">/</span><span class="lit">7.16</span><span class="pun">.</span><span class="lit">3</span><span class="pln"> libcurl</span><span class="pun">/</span><span class="lit">7.16</span><span class="pun">.</span><span class="lit">3</span> <span class="typ">OpenSSL</span><span class="pun">/</span><span class="lit">0.9</span><span class="pun">.</span><span class="lit">7l</span><span class="pln"> zlib</span><span class="pun">/</span><span class="lit">1.2</span><span class="pun">.</span><span class="lit">3</span>
<span class="typ">Host</span><span class="pun">:</span><span class="pln"> www</span><span class="pun">.</span><span class="pln">example</span><span class="pun">.</span><span class="pln">com
</span><span class="typ">Accept</span><span class="pun">-</span><span class="typ">Language</span><span class="pun">:</span><span class="pln"> en</span><span class="pun">,</span><span class="pln"> mi</span></pre>
服务端响应:
<pre class="prettyprint prettyprinted"><span class="pln">HTTP</span><span class="pun">/</span><span class="lit">1.1</span> <span class="lit">200</span><span class="pln"> OK
</span><span class="typ">Date</span><span class="pun">:</span> <span class="typ">Mon</span><span class="pun">,</span> <span class="lit">27</span> <span class="typ">Jul</span> <span class="lit">2009</span> <span class="lit">12</span><span class="pun">:</span><span class="lit">28</span><span class="pun">:</span><span class="lit">53</span><span class="pln"> GMT
</span><span class="typ">Server</span><span class="pun">:</span> <span class="typ">Apache</span>
<span class="typ">Last</span><span class="pun">-</span><span class="typ">Modified</span><span class="pun">:</span> <span class="typ">Wed</span><span class="pun">,</span> <span class="lit">22</span> <span class="typ">Jul</span> <span class="lit">2009</span> <span class="lit">19</span><span class="pun">:</span><span class="lit">15</span><span class="pun">:</span><span class="lit">56</span><span class="pln"> GMT
</span><span class="typ">ETag</span><span class="pun">:</span> <span class="str">"34aa387-d-1568eb00"</span>
<span class="typ">Accept</span><span class="pun">-</span><span class="typ">Ranges</span><span class="pun">:</span><span class="pln"> bytes
</span><span class="typ">Content</span><span class="pun">-</span><span class="typ">Length</span><span class="pun">:</span> <span class="lit">51</span>
<span class="typ">Vary</span><span class="pun">:</span> <span class="typ">Accept</span><span class="pun">-</span><span class="typ">Encoding</span>
<span class="typ">Content</span><span class="pun">-</span><span class="typ">Type</span><span class="pun">:</span><span class="pln"> text</span><span class="pun">/</span><span class="pln">plain</span></pre>
输出结果：
<pre class="prettyprint prettyprinted"><span class="typ">Hello</span> <span class="typ">World</span><span class="pun">!</span> <span class="typ">My</span><span class="pln"> payload includes a trailing CRLF</span><span class="pun">.</span></pre>
</div>