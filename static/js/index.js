$(function(){
	$('#topwx').click(function(){
		layer.open({
		  type: 1,
		  title:"扫描微信二维码",
		  skin: 'layui-layer-rim', //加上边框
		  area: ['210px', '240px'], //宽高
		  content: '<center><img src="/static/21cq/wx.png" width="100%" /></center>'
		});
	});
	
	$('#topqq').click(function(){
		layer.open({
		  type: 2,
		  title: '联系我们',
		  area: ['600px', '365px'],
		  fixed: false, //不固定
		  maxmin: false,
		  content: '/static/21cq/qq.html'
		});
	});
	/*/ 浏览记录 /*/
	$('#myhis').click(function(){
		layer.open({
		  type: 2,
		  title: "我的浏览记录",
		  shadeClose: true,
		  area: ['900px', '550px'],
		  content: '/Plus/MyHistory.aspx' 
		}); 						   
	});	

//回顶部
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

// 获取数据
function GetData(){
	var dayval = $('#day').val();
	var typeval = $('#type').val();
	var hourval = $('#hour').val();
	var minval = $('#minute').val();
	var keyval = $('#gkey').val();

	$.ajax({
		url:"/plus/ajax.aspx", //请求的url地址
		dataType:"html", //返回格式为json
		async:true,//请求是否异步，默认为异步，这也是ajax重要特性
		data:{ "day":dayval, "type":typeval, "hour":hourval, "minute":minval, "key":keyval, }, //参数值
		type:"POST", //请求方式
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
			// 状态码
                    console.log(XMLHttpRequest.status);
                    // 状态
                    console.log(XMLHttpRequest.readyState);
                    // 错误信息   
                    console.log(textStatus);
		}
	});
}

/*广告查询*/

//排行榜请求
Send({
    url: "/Plus/dblist.aspx",
    data: { VerNum: "" },
    success: function (data) {
        var store = new Array();
        var sysTypeNum = 0;
        //对数据进行处理-随机
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
        //随机-构造连体广告效果
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
        //对type=3的广告2条加红，type=2的5条加红。
        var imptList = [];
        var temp11 = [], temp22 = [], temp44 = [];
        sorted1.forEach(function (i) {
            i.forEach(function (j) {
                temp11.push(j);
            });
            //对type=3的广告2条加红，type=2的5条加红。
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
            //对type=3的广告2条加红，type=2的5条加红。
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
            //对type=3的广告2条加红，type=2的5条加红。
            if (i.length >= 2 && i[0].TJType == 3) {
                imptList.push(i[0]);
            }
            if (i.length >= 5 && i[0].TJType == 2) {
                imptList.push(i[0]);
            }
        });
        //把TJType=3的分成头尾部，TJType=2放中间
        //data.rows = temp11.concat(temp22).concat(temp3);
        var temp441 = [], temp442 = [];
        temp441 = temp44.slice(0, Math.ceil(temp44.length / 2));
        temp442 = temp44.slice(Math.ceil(temp44.length / 2));
        data.rows = temp441.concat(temp11).concat(temp442).concat(temp22).concat(temp3);


        //普通排名取前100个
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
                    '<td><a href="javascript:OpenNew(\'' + name + '\',\'' + Ip + '\',\'' + verStr + '\',\'' + url + '\');" class="Redbtn blueA">点击查看</a></td>' +
                    '<td><img src="' + GetTJImg(data.rows[k]['TJType']) + '" style="vertical-align: inherit;width:68px;" title="' + data.rows[k]['Name'] + '"/></td>' +
                    '</tr>'
                );
            } else {
                if (num == 100) {
                    break;
                } else {
                    // num++;
                }

                //imptList  对type=3的广告2条加红，type=2的5条加红。
                var activeCss = "";
                var acicon = "";
                var acItem = imptList.forEach(function (i) {
                    if (i.Url.replace("https://", "").replace("http://", "").replace("/", "") == data.rows[k]['Url'].replace("https://", "").replace("http://", "").replace("/", "")) {
                        activeCss = "style='color:#da0000'";
                        acicon = '<img src="/static/imgs/hot.gif" class="icon">';
                    }
                });

                //对于合计15000以上的没投放广告的屏蔽
                var isAD = false;

                //又不要了
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
                        '<td colspan = "8" style = "width: 100%; height: 70px;background:#fff url(/static/21cq/rankbar.gif) no-repeat top center;" ></td ></tr >');//表头图片
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
                    '<td><a href="/Search.aspx?key=' + data.rows[k]['Url'] + '" class="Redbtn blueA" target="_blank">点击查看</a></td>' +
                    '<td>' + data.rows[k]['CountPrice'] + '' + acicon + '</td>' +
                    '</tr>'
                );
            }
        }

        $("#SortTable").append(store.join(''));

        //广告图片弹窗
        $(".pk").on('click', function () {
            //debugger;
            var that = $(this).parent().siblings();
            var ranking = $(this).parent().find("div").eq(0).text();
            var adName = that.eq(0).text();
            var priceStr = '￥' + that.eq(6).text();
            var date = new Date();
            var dateStr = date.getFullYear().toString() + "年" + (date.getMonth() + 1).toString() + "月" + date.getDate().toString() + "日";
            showPkModal({
                ranking: ranking,
                adName: adName,
                price: priceStr,
                date: dateStr
            });
        });

    }
});