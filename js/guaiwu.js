$(function(){
    var allfirsthtml=""
    //var dd={

    //}
    var a = 0;
    $.each(Xin, function (index, item) {
        a++;
        if (item.c!="") { 
            allfirsthtml += "<div class='hove onec' cn='" + item.n + "' >" + a + Name[item.n] + "</div>"
        }
    })
    $("#equList").html(allfirsthtml)
   //console.log(Xin)
    //console.log(Two)
    $("#search").on("click", function () {
        var key = $("#key").val()
        if (key == "") {
            allfirsthtml = ""
            var a = 0;
            $.each(Xin, function (index, item) {
                a++;
                allfirsthtml += "<div class='hove onec' cn='" + item.n + "' >" + a  + Name[item.n] + "</div>"

            })
        } else {
            var arr = []
            for (var i = 0; i < Name.length; i++) {
                if (Name[i].indexOf(key) > -1) {
                    arr.push(i)
                }
            }
            var allfirsthtml = ""
            var a = 0;
            $.each(Xin, function (index, item) {
                if (item.c != "" && arr.indexOf(item.n) > -1) {
                    a++;
                    allfirsthtml += "<div class='hove onec' cn='" + item.n + "' >" + a  + Name[item.n] + "</div>"

                }
            })
        }
        $("#equList").html(allfirsthtml)
    })
    //console.log(Three)
    //console.log(Name)
    $("#equList").on("click", ".onec", function () {
        const cn = parseInt($(this).attr("cn"))
        var html = ""
        var Arr = Xin.filter(function (cd) { return cd.n == cn })
      //  console.log(oneArr,cn)
        if (Arr.length > 0) {
            var Data = Arr[0].c
            $.each(Data, function (index, item) {
                html += "<div class='hove twoc' cn='" + item + "' >" + Name[item] + "</div>"
            })
            var may = cn
            lala =  Name[cn];  
        }
        $("#monList").html(html)
        $("#monTitle").html(lala)
    })
    $("#equList").on("click", ".onec", function () {

        const cn = parseInt($(this).attr("cn"))
        var html = ""
        var dssx = ""
        var Arr = Two.filter(function (cd) { return cd.n == cn })
        console.log(Arr, cn)
        if (Arr.length > 0) {
            var Data = Arr[0].c
            $.each(Data, function (index, item) {
                html += "<div class='hove threec' cn='" + item + "' >" + Name[item] + "</div>"
            })
            var sx = Arr[0].b
            if (sx && sx.length > 0) {
                dssx = ""
                $.each(sx, function (index, item) {
                    dssx += "<div  >" + Name[item] + "</div>"
                })
            }
        }
        log(dssx)
        $("#mapList").html(html)
        $("#dingshicon").html(dssx)
    })
    $("#mapList").on("click", ".threec", function () {

        const cn = parseInt($(this).attr("cn"))
        var html = "<div > <fieldset class='layui-elem-field'><legend> </legend><div class='layui-field-box'>wu</div></fieldset ></div >"
        var dssx = "<div > <fieldset class='layui-elem-field'><legend> npc</legend><div class='layui-field-box'>wu</div></fieldset ></div >"
        var Arr = Three.filter(function (cd) { return cd.n == cn })
        console.log(Arr, cn)
        if (Arr.length > 0) {
            html = "";
            var Data = Arr[0].c
            $.each(Data, function (index, item) {
                html += "<div > <fieldset class='layui-elem-field'><legend> </legend><div class='layui-field-box'>" + Name[item] + "</div></fieldset ></div > "
            })
            var may = cn
            lala = "<a style='color:red;'>" + Name[cn] + "</a>";
            var sx = Arr[0].b
            if (sx && sx.length > 0) {
                dssx = ""
                $.each(sx, function (index, item) {
                    dssx += "<div > <fieldset class='layui-elem-field'><legend> NPC</legend><div class='layui-field-box'>" + Name[item] + "</div></fieldset ></div > "
                })
                var may = cn
                lala = "<a style='color:red;'>" + Name[cn] + "</a>";
            }
        }
        $("#mapTransferList").html(html)
        $("#mapTransferTitle").html(lala)
        $("#mapTransferLists").html(dssx)
    })

 
    
})
window.log = (function (l) { console.log(l)})