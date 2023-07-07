<!-- TOC -->

- [Vue 本地 localhost 从 http 307 到 https](#vue-%E6%9C%AC%E5%9C%B0-localhost-%E4%BB%8E-http-307-%E5%88%B0-https)
  - [HTTP 307 与 HSTS](#http-307-%E4%B8%8E-hsts)
    - [HTTP 307](#http-307)
    - [HSTSHTTP Strict Transport Security](#hstshttp-strict-transport-security)
  - [如何解决问题](#%E5%A6%82%E4%BD%95%E8%A7%A3%E5%86%B3%E9%97%AE%E9%A2%98)

<!-- /TOC -->

# Vue 本地 localhost 从 http 307 到 https
最近在工作上遇到一个问题, 一个 Vue2 项目之前本地都是通过 http 的 localhost 访问(如下) 后来突然无法访问了, 提示的错误内容是 `ERR_SSL_PROTOCOL_ERROR`
![](../image/Snipaste_2023-07-06_20-54-55.png)


![](../image/Snipaste_2023-07-06_21-29-46.png)

我打开开发工具的 Network 一看, 本来好好的 http 被 307 到了 https. 为啥会出现这种情况呢?

![](../image/Snipaste_2023-07-06_21-31-32.png)

因为我本地的另一个 localhost 开启了 https 而且使用了 [HSTS](https://weblog.west-wind.com/posts/2022/Oct/24/Fix-automatic-rerouting-of-http-to-https-on-localhost-in-Web-Browsers#why-is-this-happening-hsts).

![](../image/Snipaste_2023-07-06_21-52-09.png)

## HTTP 307 与 HSTS
### HTTP 307
HTTP 状态码是服务器对浏览器的响应. 每个状态码都是一个三位数字, 其中第一位数字定义了响应的类型. 3xx 表示重定向, 即浏览器会重定向到一个新的 URL, 并且这个 URL 是 HTTP 响应头 Location 的值. 如上图

[307](https://kinsta.com/knowledgebase/307-redirect/) 代表的是临时重定向状态码, 与 302 和 303 不同的是, 307 不允许重定向修改请求方法, 相对来说就更加严格.
### HSTS(HTTP Strict Transport Security)
如果一个网站运行于 HTTPS 之上, 那么 HSTS 强迫浏览器使用安全连接, 任何通过使用 HTTP 访问网站的尝试都将被强制转换为 HTTPS. 实际上, [Strict-Transport-Security](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security) 就是一个响应头. 

## 如何解决问题

![](../image/)

