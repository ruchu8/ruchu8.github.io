$(function(){
	$('#topwx').click(function(){
		layer.open({
		  type: 1,
		  title:"ɨ��΢�Ŷ�ά��",
		  skin: 'layui-layer-rim', //���ϱ߿�
		  area: ['210px', '240px'], //���
		  content: '<center><img src="/static/21cq/wx.png" width="100%" /></center>'
		});
	});
	
	$('#topqq').click(function(){
		layer.open({
		  type: 2,
		  title: '��ϵ����',
		  area: ['600px', '365px'],
		  fixed: false, //���̶�
		  maxmin: false,
		  content: '/static/21cq/qq.html'
		});
	});
	/*/ �����¼ /*/
	$('#myhis').click(function(){
		layer.open({
		  type: 2,
		  title: "�ҵ������¼",
		  shadeClose: true,
		  area: ['900px', '550px'],
		  content: '/Plus/MyHistory.aspx' 
		}); 						   
	});	

//�ض���
$("#backToTop").click(function () {
	$('body,html').animate({ scrollTop: 0 }, 1000);
	return false;
});
$(document).scroll(function () {
	var scrollTop = $(document).scrollTop();
	if (scrollTop > 34) {
		$('.top').addClass('header_scroll')
	} else {
		$('.top').removeClass('header_scroll')
	}
});
});

// ��ȡ����
function GetData(){
	var dayval = $('#day').val();
	var typeval = $('#type').val();
	var hourval = $('#hour').val();
	var minval = $('#minute').val();
	var keyval = $('#gkey').val();

	$.ajax({
		url:"/plus/ajax.aspx", //�����url��ַ
		dataType:"html", //���ظ�ʽΪjson
		async:true,//�����Ƿ��첽��Ĭ��Ϊ�첽����Ҳ��ajax��Ҫ����
		data:{ "day":dayval, "type":typeval, "hour":hourval, "minute":minval, "key":keyval, }, //����ֵ
		type:"POST", //����ʽ
		beforeSend:function(){
			$('.listContainer').html("");
			$('#result').html("<center><br/><br/><br/><br/><br/><img src=\"/static/imgs/loading.gif\" /><br/><br/><br/><br/><br/></center>");
		},
		success:function(data){			
			$('#result').html(data);
		},
		complete:function(){
			console.log("pk");
		},
		error:function (XMLHttpRequest, textStatus, errorThrown) {
			// ״̬��
                    console.log(XMLHttpRequest.status);
                    // ״̬
                    console.log(XMLHttpRequest.readyState);
                    // ������Ϣ   
                    console.log(textStatus);
		}
	});
}

/*����ѯ*/

//���а�����
Send({
    url: "/Plus/dblist.aspx",
    data: { VerNum: "" },
    success: function (data) {
        var store = new Array();
        var sysTypeNum = 0;
        //�����ݽ��д���-���
        var temp1 = [], temp2 = [], temp3 = [], temp4 = [];
        if (data.rows.length > 0) {
            for (var i = 0; i < data.rows.length; i++) {
                var item = data.rows[i];
                if (item['TJType'] == 2) {
                    temp1.push(item);
                } else if (item['TJType'] == 1) {
                    temp2.push(item);
                }
                else if (item['TJType'] == 3) {
                    temp4.push(item);
                }
                else {
                    temp3.push(item);
                }
            }
        }
        //���-����������Ч��
        var sorted1 = groupBy(temp1, function (item) {
            return [item.Url];
        });
        var sorted2 = groupBy(temp2, function (item) {
            return [item.Url];
        });
        var sorted4 = groupBy(temp4, function (item) {
            return [item.Url];
        });
        sorted1.sort(randomsort);
        sorted2.sort(randomsort);
        sorted4.sort(randomsort);
        //��type=3�Ĺ��2���Ӻ죬type=2��5���Ӻ졣
        var imptList = [];
        var temp11 = [], temp22 = [], temp44 = [];
        sorted1.forEach(function (i) {
            i.forEach(function (j) {
                temp11.push(j);
            });
            //��type=3�Ĺ��2���Ӻ죬type=2��5���Ӻ졣
            if (i.length >= 2 && i[0].TJType == 3) {
                imptList.push(i[0]);
            }
            if (i.length >= 5 && i[0].TJType == 2) {
                imptList.push(i[0]);
            }
        });
        sorted2.forEach(function (i) {
            i.forEach(function (j) {
                temp22.push(j);
            });
            //��type=3�Ĺ��2���Ӻ죬type=2��5���Ӻ졣
            if (i.length >= 2 && i[0].TJType == 3) {
                imptList.push(i[0]);
            }
            if (i.length >= 5 && i[0].TJType == 2) {
                imptList.push(i[0]);
            }
        });
        sorted4.forEach(function (i) {
            i.forEach(function (j) {
                temp44.push(j);
            });
            //��type=3�Ĺ��2���Ӻ죬type=2��5���Ӻ졣
            if (i.length >= 2 && i[0].TJType == 3) {
                imptList.push(i[0]);
            }
            if (i.length >= 5 && i[0].TJType == 2) {
                imptList.push(i[0]);
            }
        });
        //��TJType=3�ķֳ�ͷβ����TJType=2���м�
        //data.rows = temp11.concat(temp22).concat(temp3);
        var temp441 = [], temp442 = [];
        temp441 = temp44.slice(0, Math.ceil(temp44.length / 2));
        temp442 = temp44.slice(Math.ceil(temp44.length / 2));
        data.rows = temp441.concat(temp11).concat(temp442).concat(temp22).concat(temp3);


        //��ͨ����ȡǰ100��
        var num = 0;
        for (var k = 0; k < data.rows.length; k++) {

            var shareImg = "";
            if (data.rows[k]['ADShare_Id'] != 0) {
                shareImg = '<img class="Redpacket" data-id="' + data.rows[k]['ADShare_Id'] + '" src="/static/imgs/redpacket.gif" style="position: absolute;left: 0;top: 0;cursor: pointer;">';
            }
            if (data.rows[k]['SysType'] == 1) {
                var trCss = "";
                if (data.rows[k]['TJType'] == 1) {
                    trCss = "yellow";
                }
                else if (data.rows[k]['TJType'] == 3) {
                    trCss = "gold";
                }
                else {
                    trCss = "yellow";
                }
                sysTypeNum++;



                var headStr = "";
                if (data.rows[k]['TJType'] == "1") {
                    headStr = '<td style="position: relative;">' + shareImg + '<img src="/static/imgs/vip1.gif" style="height: 30px;" title="' + data.rows[k]['Name'] + '"/></td>'
                }
                else if (data.rows[k]['TJType'] == "3") {
                    headStr = '<td style="position: relative;">' + shareImg + '<img src="/static/imgs/vip2.gif" style="height: 30px;" title="' + data.rows[k]['Name'] + '"/></td>'
                }
                else {
                    headStr = '<td style="position: relative;">' + shareImg + '<img src="/static/imgs/vip1.gif" style="height: 30px;" title="' + data.rows[k]['Name'] + '"/></td>'
                }
                var name = encodeURI(data.rows[k]['Name']);
                var Ip = encodeURI(data.rows[k]['Ip']);
                var verStr = encodeURI(data.rows[k]['Ver']);
                var url = encodeURI(data.rows[k]['Url']);
                //System
                store.push(
                    '<tr class="td ' + trCss + '">' +
                    headStr +
                    '<td><a href="javascript:OpenNew(\'' + name + '\',\'' + Ip + '\',\'' + verStr + '\',\'' + url + '\');">' + data.rows[k]['Name'] + '</a></td>' +
                    '<td>' + data.rows[k]['Ip'] + '</td>' +
                    '<td>' + data.rows[k]['Line'] + '</td>' +
                    '<td>' + data.rows[k]['Ver'] + '</td>' +
                    '<td>' + data.rows[k]['QQ'] + '</td>' +
                    '<td><a href="javascript:OpenNew(\'' + name + '\',\'' + Ip + '\',\'' + verStr + '\',\'' + url + '\');" class="Redbtn blueA">����鿴</a></td>' +
                    '<td><img src="' + GetTJImg(data.rows[k]['TJType']) + '" style="vertical-align: inherit;width:68px;" title="' + data.rows[k]['Name'] + '"/></td>' +
                    '</tr>'
                );
            } else {
                if (num == 100) {
                    break;
                } else {
                    // num++;
                }

                //imptList  ��type=3�Ĺ��2���Ӻ죬type=2��5���Ӻ졣
                var activeCss = "";
                var acicon = "";
                var acItem = imptList.forEach(function (i) {
                    if (i.Url.replace("https://", "").replace("http://", "").replace("/", "") == data.rows[k]['Url'].replace("https://", "").replace("http://", "").replace("/", "")) {
                        activeCss = "style='color:#da0000'";
                        acicon = '<img src="/static/imgs/hot.gif" class="icon">';
                    }
                });

                //���ںϼ�15000���ϵ�ûͶ�Ź�������
                var isAD = false;

                //�ֲ�Ҫ��
                //if (data.rows[k]['CountPrice'] > 15000) {
                //    if (data.rows[k]['Url'] .indexOf('www.5200zq.top') > 0) {
                //        var aaaaa = 1;
                //    }
                //    try {
                //        data.rows.forEach(function (i) {
                //            if (i.SysType == 1) {
                //                if ( i.Url.replace("https://", "").replace("http://", "").replace("/", "") == data.rows[k]['Url'].replace("https://", "").replace("http://", "").replace("/", "")) {
                //                    {
                //                        isAD = true;
                //                        num++;
                //                        throw new Error("EndIterative");
                //                    }
                //                }
                //            }
                //        });
                //    } catch (e) {

                //    }

                //} else {
                //    isAD = true;
                //    num++;
                //}

                isAD = true;
                num++;
                if (!isAD) {
                    continue;
                }

                var numCss = "";
                if (num == 1) {
                    numCss = "rnum1";
                    store.push('<tr style="height: 70px;">' +
                        '<td colspan = "8" style = "width: 100%; height: 70px;background:#fff url(/static/21cq/rankbar.gif) no-repeat top center;" ></td ></tr >');//��ͷͼƬ
                } else if (num == 2) {
                    numCss = "rnum2";
                } else if (num == 3) {
                    numCss = "rnum3";
                } else if (num == 4) {
                    numCss = "rnum4";
                } else if (num == 5) {
                    numCss = "rnum5";
                } else if (num == 6) {
                    numCss = "rnum6";
                } else if (num == 7) {
                    numCss = "rnum7";
                } else if (num == 8) {
                    numCss = "rnum8";
                } else if (num == 9) {
                    numCss = "rnum9";
                } else if (num == 10) {
                    numCss = "rnum10";
                }
				else{
                    numCss = "rnum_other";
                }


                var nameStr = encodeURI(data.rows[k]['Name']);
                var name = encodeURI(data.rows[k]['Name']);
                var Ip = encodeURI(data.rows[k]['Ip']);
                var verStr = encodeURI(data.rows[k]['Ver']);
                var url = encodeURI(data.rows[k]['Url']);
                shareImg = '<img class="pk" src="/static/imgs/pk-bang.gif">';
                store.push(
                    '<tr class="td">' +
                    '<td class="pk-td">' + shareImg + '<div class="' + numCss + '">' + (num) + '</div></td>' +
                    '<td><a ' + activeCss + ' href="javascript:OpenNew(\'' + name + '\',\'' + Ip + '\',\'' + verStr + '\',\'' + url + '\');">' + data.rows[k]['Name'] + '</a></td>' +
                    '<td>' + data.rows[k]['Ip'] + '</td>' +
                    '<td>' + data.rows[k]['Line'] + '</td>' +
                    '<td>' + data.rows[k]['Ver'] + '</td>' +
                    '<td>' + data.rows[k]['QQ'] + '</td>' +
                    '<td><a href="/Search.aspx?key=' + data.rows[k]['Url'] + '" class="Redbtn blueA" target="_blank">����鿴</a></td>' +
                    '<td>' + data.rows[k]['CountPrice'] + '' + acicon + '</td>' +
                    '</tr>'
                );
            }
        }

        $("#SortTable").append(store.join(''));

        //���ͼƬ����
        $(".pk").on('click', function () {
            //debugger;
            var that = $(this).parent().siblings();
            var ranking = $(this).parent().find("div").eq(0).text();
            var adName = that.eq(0).text();
            var priceStr = '��' + that.eq(6).text();
            var date = new Date();
            var dateStr = date.getFullYear().toString() + "��" + (date.getMonth() + 1).toString() + "��" + date.getDate().toString() + "��";
            showPkModal({
                ranking: ranking,
                adName: adName,
                price: priceStr,
                date: dateStr
            });
        });

    }
});