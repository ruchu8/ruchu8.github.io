const images = [
  'https://image.baidu.com/search/down?url=https://tvax2.sinaimg.cn/large/0072Vf1pgy1foxkc8ob14j31hc0u016f.jpg',
  'https://image.baidu.com/search/down?url=https://tvax2.sinaimg.cn/large/0072Vf1pgy1foxlogttvbj31hc0u0dyf.jpg',
  'https://image.baidu.com/search/down?url=https://tvax4.sinaimg.cn/large/0072Vf1pgy1foxkfylhhxj31hc0u04dv.jpg',
  'https://image.baidu.com/search/down?url=https://tvax3.sinaimg.cn/large/0072Vf1pgy1foxkj4ucdkj31kw0w0e6w.jpg',
  'https://image.baidu.com/search/down?url=https://tvax2.sinaimg.cn/large/0072Vf1pgy1foxk45w3toj31hc0u01al.jpg',
  'https://image.baidu.com/search/down?url=https://tvax3.sinaimg.cn/large/0072Vf1pgy1fodqop5rd7j31kw148npj.jpg',
  'https://image.baidu.com/search/down?url=https://tvax3.sinaimg.cn/large/0072Vf1pgy1foxkc5tuavj31hc0u0kc9.jpg',
  'https://image.baidu.com/search/down?url=https://tvax2.sinaimg.cn/large/0072Vf1pgy1foxkihz4b4j31hc0u0wux.jpg',
  'https://image.baidu.com/search/down?url=https://tvax4.sinaimg.cn/large/0072Vf1pgy1foxlhpidhbj31hc0u0qkv.jpg',
  'https://image.baidu.com/search/down?url=https://tvax3.sinaimg.cn/large/0072Vf1pgy1foxkjhrf2qj31hc0u01d4.jpg',
  'https://image.baidu.com/search/down?url=https://tvax3.sinaimg.cn/large/0072Vf1pgy1foxkcbupzhj31kw0w0x4l.jpg',
  'https://image.baidu.com/search/down?url=https://tvax1.sinaimg.cn/large/a15b4afegy1fmvjo4zr31j21hc0u07c9.jpg',
  'https://image.baidu.com/search/down?url=https://tvax1.sinaimg.cn/large/a15b4afely1fnt9l5rvplj21hc0u07pe.jpg'
];

const randomImage = images[Math.floor(Math.random() * images.length)];
document.body.style.backgroundImage = `url(${randomImage})`;

function clickEffect() {
  let balls = [];
  let longPressed = false;
  let longPress;
  let multiplier = 0;
  let width, height;
  let origin;
  let normal;
  let ctx;
  const colours = ["#F73859", "#14FFEC", "#00E0FF", "#FF99FE", "#FAF15D"];
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);
  canvas.setAttribute("style", "width: 100%; height: 100%; top: 0; left: 0; z-index: 99999; position: fixed; pointer-events: none;");
  const pointer = document.createElement("span");
  pointer.classList.add("pointer");
  document.body.appendChild(pointer);

  if (canvas.getContext && window.addEventListener) {
    ctx = canvas.getContext("2d");
    updateSize();
    window.addEventListener('resize', updateSize, false);
    loop();
    window.addEventListener("mousedown", function(e) {
      pushBalls(randBetween(10, 20), e.clientX, e.clientY);
      document.body.classList.add("is-pressed");
      longPress = setTimeout(function(){
        document.body.classList.add("is-longpress");
        longPressed = true;
      }, 500);
    }, false);
    window.addEventListener("mouseup", function(e) {
      clearInterval(longPress);
      if (longPressed == true) {
        document.body.classList.remove("is-longpress");
        pushBalls(randBetween(50 + Math.ceil(multiplier), 100 + Math.ceil(multiplier)), e.clientX, e.clientY);
        longPressed = false;
      }
      document.body.classList.remove("is-pressed");
    }, false);
    window.addEventListener("mousemove", function(e) {
      let x = e.clientX;
      let y = e.clientY;
      pointer.style.top = y + "px";
      pointer.style.left = x + "px";
    }, false);
  } else {
    console.log("canvas or addEventListener is unsupported!");
  }

  function updateSize() {
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.scale(2, 2);
    width = (canvas.width = window.innerWidth);
    height = (canvas.height = window.innerHeight);
    origin = {
      x: width / 2,
      y: height / 2
    };
    normal = {
      x: width / 2,
      y: height / 2
    };
  }

  class Ball {
    constructor(x = origin.x, y = origin.y) {
      this.x = x;
      this.y = y;
      this.angle = Math.PI * 2 * Math.random();
      if (longPressed == true) {
        this.multiplier = randBetween(14 + multiplier, 15 + multiplier);
      } else {
        this.multiplier = randBetween(6, 12);
      }
      this.vx = (this.multiplier + Math.random() * 0.5) * Math.cos(this.angle);
      this.vy = (this.multiplier + Math.random() * 0.5) * Math.sin(this.angle);
      this.r = randBetween(8, 12) + 3 * Math.random();
      this.color = colours[Math.floor(Math.random() * colours.length)];
    }
    update() {
      this.x += this.vx - normal.x;
      this.y += this.vy - normal.y;
      normal.x = -2 / window.innerWidth * Math.sin(this.angle);
      normal.y = -2 / window.innerHeight * Math.cos(this.angle);
      this.r -= 0.3;
      this.vx *= 0.9;
      this.vy *= 0.9;
    }
  }

  function pushBalls(count = 1, x = origin.x, y = origin.y) {
    for (let i = 0; i < count; i++) {
      balls.push(new Ball(x, y));
    }
  }

  function randBetween(min, max) {
    return Math.floor(Math.random() * max) + min;
  }

  function loop() {
    ctx.fillStyle = "rgba(255, 255, 255, 0)";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < balls.length; i++) {
      let b = balls[i];
      if (b.r < 0) continue;
      ctx.fillStyle = b.color;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2, false);
      ctx.fill();
      b.update();
    }
    if (longPressed == true) {
      multiplier += 0.2;
    } else if (!longPressed && multiplier >= 0) {
      multiplier -= 0.4;
    }
    removeBall();
    requestAnimationFrame(loop);
  }

  function removeBall() {
    for (let i = 0; i < balls.length; i++) {
      let b = balls[i];
      if (b.x + b.r < 0 || b.x - b.r > width || b.y + b.r < 0 || b.y - b.r > height || b.r < 0) {
        balls.splice(i, 1);
      }
    }
  }

  var stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.type = 'text/css';
  stylesheet.href = 'https://ruchu.zone.id/css.css';
  document.head.appendChild(stylesheet);
}

clickEffect();

   // 添加 disable-devtool.min.js 脚本
// var script = document.createElement("script");
// script.src = "https://r9ser.oss-cn-shanghai.aliyuncs.com/cdn-main/js/disable-devtool.min.js";
// document.body.appendChild(script);


var script = document.createElement("script");
script.setAttribute("type","text/javascript");
script.setAttribute("id","myhk");
script.setAttribute("src","https://myhkw.cn/api/player/171819249893");
script.setAttribute("key","171819249893");
script.setAttribute("m","1");
document.documentElement.appendChild(script);

!function(p){"use strict";!function(t){var s=window,e=document,i=p,c="".concat("https:"===e.location.protocol?"https://":"http://","sdk.51.la/js-sdk-pro.min.js"),n=e.createElement("script"),r=e.getElementsByTagName("script")[0];n.type="text/javascript",n.setAttribute("charset","UTF-8"),n.async=!0,n.src=c,n.id="LA_COLLECT",i.d=n;var o=function(){s.LA.ids.push(i)};s.LA?s.LA.ids&&o():(s.LA=p,s.LA.ids=[],o()),r.parentNode.insertBefore(n,r)}()}({id:"3JecfPs4AVT64MiW",ck:"3JecfPs4AVT64MiW"});


// added functionality
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let randomNum = getRandomInt(10, 100);
document.getElementById('zxrsts').innerHTML = randomNum;

function updateDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();
  const weekDay = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][now.getDay()];

  const dateTimeString = `${year}-${padZero(month)}-${padZero(day)} ${padZero(hour)}:${padZero(minute)}:${padZero(second)}: `;
  document.getElementById('sp_zx').innerHTML = `${dateTimeString} 在线:<label id="zxrsts" style="color: yellow;">${randomNum}</label>人`;

  function padZero(num) {
    return num < 10 ? `0${num}` : num;
  }
}

setInterval(updateDateTime, 1000); // 更新时间每秒一次
