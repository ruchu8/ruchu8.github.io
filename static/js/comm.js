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



//����ӿ�
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
                //����ʧ��
                //alert("����ʧ��");
                return false;
            }
        },
        error: function (a, b, c) {
            //��������
            if ($.isFunction(options.error)) {
                options.error(a, b, c);
            }
        }
    });
    return request;
};

/*���а�*/
//���
function randomsort(a, b) {
    return Math.random() > .5 ? -1 : 1; //ͨ���������0��1������Ȼ���ж��Ƿ����0.5�Ӷ�Ӱ�����򣬲�������Ե�Ч����
}

//����
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
        var date = options.date || ''; // ��ͼ

        var canvas = document.createElement("canvas");
        canvas.width = 531;
        canvas.height = 800;
        var ctx = canvas.getContext("2d");
        var maxWidth = 520; //���Ʊ���

        var img = new Image();
        img.src = "/static/imgs/pk-bg.png";

        img.onload = function () {
            // ����ͼƬ
            ctx.drawImage(img, 0, 0, 531, 800); // ����

            drawText({
                text: ranking,
                color: "#931006",
                fontsize: 42,
                align: "center",
                x: 265,
                y: 290
            }); // ����

            drawText({
                text: adName,
                color: "#FFF1C7",
                fontsize: 26,
                weight: 'bold',
                align: "center",
                x: 265,
                y: 388
            }); // �۸�

            drawText({
                text: price,
                color: "#000",
                fontsize: 34,
                align: "center",
                x: 265,
                y: 578
            }); // ����

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
                title: '�Ҽ� ͼƬ���Ϊ ���浽����',
                //����ʾ����
                // closeBtn: 2, //��ť���2
                area: ['531px'],
                shadeClose: true,
                //�Ƿ������ֹر�
                content: '<img style="display:block;width:531px;height:800px;" src="' + canvas.toDataURL('image/png') + '" >'
            });
        };
		

        function drawText(obj) {
            ctx.save(); //save��restore���Ա�֤��ʽ����ֻ�����ڸö�canvasԪ�� 

            var row = []; //����

            var chr = obj.text.split("");
            var temp = "";
            ctx.fillStyle = obj.color; //����������ɫ

            var font_size = obj.fontsize; //�����С

            var font_family = obj.family || "Microsoft YaHei";
            var weight = obj.weight || "";
            ctx.font = weight + ' ' + font_size + "px " + font_family; //����

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