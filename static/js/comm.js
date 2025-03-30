function OpenNew(name, Ip, verStr, url) {
name = DecodeURIReplace(name);
Ip = DecodeURIReplace(Ip);
verStr = DecodeURIReplace(verStr);
url = DecodeURIReplace(url);
Send({
	url: "/Plus/GameRecord.aspx",
	data: { Url: url, GameName: name, Ip: Ip, VerStr: verStr },
	success: function (data) { }
});
window.open(url);

}

function DecodeURIReplace(str) {
    if (str) {
        if (str.indexOf('%') > -1) {
            str = str.replace(/%/g, '%25');
        }
        return decodeURI(str);
    }
    return '';
}



//请求接口
function Send(options) {
    var request = $.ajax({
        type: options.type || "POST",
        url: options.url,
        data: options.data || {},
        dataType: options.dataType || "json",
        async: options.async == undefined ? true : options.async,
        //contentType: options.contentType || "application/json",
        success: function (data, state) {
            if (state == "success") {
                if ($.isFunction(options.success)) {
                    if (data.rows) {
                        options.success(data, state);
                        return;
                    }
                    switch (data.state) {
                        case 1: {
                            options.success(data, state);
                            break;
                        }
                        default: {
                            if (data && data.length > 0) {
                                options.success(data, state);
                            } else {
                                if ($.isFunction(options.error)) {
                                    options.error(null, null, null);
                                }
                            }
                            return false;
                        }
                    }
                }
            } else {
                //请求失败
                //alert("请求失败");
                return false;
            }
        },
        error: function (a, b, c) {
            //网络问题
            if ($.isFunction(options.error)) {
                options.error(a, b, c);
            }
        }
    });
    return request;
};

/*排行榜*/
//随机
function randomsort(a, b) {
    return Math.random() > .5 ? -1 : 1; //通过随机产生0到1的数，然后判断是否大于0.5从而影响排序，产生随机性的效果。
}

//分组
function groupBy(array, f) {
    const groups = {};
    array.forEach(function (o) {
        const group = JSON.stringify(f(o));
        groups[group] = groups[group] || [];
        groups[group].push(o);
    });
    return Object.keys(groups).map(function (group) {
        return groups[group];
    });
}

var GetTJImg = function (t) {
    switch (t) {
        case 1: { return '/static/imgs/jptg.png'; }
        case 2: { return '/static/imgs/tui.gif'; }
        case 3: { return '/static/imgs/qltj.gif'; }
        default: { return ''; }
    }
}

function showPkModal(options) {
        var ranking = options.ranking || '';
        var adName = options.adName || '';
        var price = options.price || '';
        var date = options.date || ''; // 画图

        var canvas = document.createElement("canvas");
        canvas.width = 531;
        canvas.height = 800;
        var ctx = canvas.getContext("2d");
        var maxWidth = 520; //绘制背景

        var img = new Image();
        img.src = "/static/imgs/pk-bg.png";

        img.onload = function () {
            // 背景图片
            ctx.drawImage(img, 0, 0, 531, 800); // 排名

            drawText({
                text: ranking,
                color: "#931006",
                fontsize: 42,
                align: "center",
                x: 265,
                y: 290
            }); // 名称

            drawText({
                text: adName,
                color: "#FFF1C7",
                fontsize: 26,
                weight: 'bold',
                align: "center",
                x: 265,
                y: 388
            }); // 价格

            drawText({
                text: price,
                color: "#000",
                fontsize: 34,
                align: "center",
                x: 265,
                y: 578
            }); // 日期

            drawText({
                text: date,
                color: "#a0522d",
                fontsize: 26,
                align: "center",
                x: 265,
                y: 670
            });
            layer.open({
                type: 1,
                title: '右键 图片另存为 保存到本地',
                //不显示标题
                // closeBtn: 2, //按钮风格2
                area: ['531px'],
                shadeClose: true,
                //是否点击遮罩关闭
                content: '<img style="display:block;width:531px;height:800px;" src="' + canvas.toDataURL('image/png') + '" >'
            });
        };
		

        function drawText(obj) {
            ctx.save(); //save和restore可以保证样式属性只运用于该段canvas元素 

            var row = []; //行数

            var chr = obj.text.split("");
            var temp = "";
            ctx.fillStyle = obj.color; //设置字体颜色

            var font_size = obj.fontsize; //字体大小

            var font_family = obj.family || "Microsoft YaHei";
            var weight = obj.weight || "";
            ctx.font = weight + ' ' + font_size + "px " + font_family; //字体

            ctx.textAlign = obj.align || 'left';

            if (ctx.measureText(obj.text).width < maxWidth) {
                row.push(obj.text);
            } else {
                for (var a = 0; a < chr.length; a++) {
                    if (ctx.measureText(temp).width < maxWidth) {
                        ;
                    } else {
                        row.push(temp);
                        temp = "";
                    }

                    temp += chr[a];
                }

                row.push(temp);
            }

            for (var i = 0; i < row.length; i++) {
                ctx.fillText(row[i], obj.x, obj.y + i * font_size * 1.4);
            }

            ctx.restore();
        }
    };