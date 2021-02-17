# URI预编码

### decodeURI与decodeURIComponent区别

##### 1. 概念：

**URI**: Uniform ResourceIdentifiers,通用资源标识符

vue和nodejs（ Global对象 ）中含有的encodeURI()和encodeURIComponent()方法可以对URI进行编码，以便发送给浏览器。有效的URI中不能包含某些字符，例如空格。而这URI编码方法就可以对URI进行编码，它们用特殊的UTF-8编码替换所有无效的字 符，从而让浏览器能够接受和理解。

> **encodeURI**()主要用于整个URI(例如，http://www.jxbh.cn/illegal value.htm)，encodeURI()不会对本身属于URI的特殊字符进行编码，例如冒号、正斜杠、问号和井字号；
>
> **encodeURIComponent**()则会对它发现的任何非标准字符进行编码。来看下面的例子：

```js
var uri="http://www.jxbh.cn/illegal value.htm#start";
//”http: //www.jxbh.cn/illegal%20value .htm#s tart”
alert(encodeURI (uri)):
//”http% 3A%2F%2Fwww.jxbh.cn%2 Fillegal%2 0value. htm%23 start”
alert( encodaURIComponent (uri));
```

使用encodeURI()编码后的结果是除了空格之外的其他字符都原封不动，只有空格被替换成了%20。而encodeURIComponent()方法则会使用对应的编码替换所有非字母数字字符。这也正是可以对整个URI使用encodeURI()，而只能对附加在现有URI后面的字符串使用encodeURIComponent()的原因所在。一般来说,我们使用encodeURIComponent()方法的时候要比使用encodeURI()更多,因为在实践中更常见的是对查询字符串参数而不是对基础URL进行编码.

> 经我的观测，很多网站的cookie在进行编码的时候，是encodeURIComponent格式的，所以应该使用decodeURIComponent()进行解码

至少已知的是koa是没有解码效果的。

