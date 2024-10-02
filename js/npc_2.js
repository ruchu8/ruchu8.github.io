$(function () {
    var allfirsthtml = ""
    //var dd={

    //}
    $.each(Npcshuju, function (index, item) {

        allfirsthtml += "<div class='hove onec' cn='" + item.n + "' >" + Name[item.n] + "</div>"

    })
    $("#equList").html(allfirsthtml)
    //console.log(Xin)
    //console.log(Two)
    $("#search").on("click", function () {
        
        if (key == "") {
            allfirsthtml = ""
            var a = 0;
            $.each(Npcshuju, function (index, item) {
                a++;
                allfirsthtml += "<div class='hove onec' cn='" + item.n + "' >" + a  + Name[item.n] + "</div>"

            })
        } else {
            var arr = []
           
                //  debugger
                var key = $("#key").val()
            for (var i = 0; i < Name.length; i++) {
                if (Name[i].indexOf(key) > -1) {
                    arr.push(i)
                }
            }
            var allfirsthtml = ""
            var a = 0;
            $.each(Npcshuju, function (index, item) {
                if (arr.indexOf(item.n) > -1) {
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
        var Arr = Npcshuju.filter(function (cd) { return cd.n == cn })
        //  console.log(oneArr,cn)
        if (Arr.length > 0) {
            var Data = Arr[0].c
            $.each(Data, function (index, item) {
                html += "<div class='hove twoc' cn='" + item + "' >" + Name[item] + "</div>"
            })
        }
        $("#mapList").html(html)
    })
    $("#equList").on("click", ".onec", function () {

        const cn = parseInt($(this).attr("cn"))
        var html = ""
        var Arr = Npcshuju.filter(function (cd) { return cd.n == cn })
        //  console.log(oneArr,cn)
        if (Arr.length > 0) {
            var Data = Arr[0].b
            $.each(Data, function (index, item) {
                html += "<div class='hove twoc' cn='" + item + "' >" + Name[item] + "</div>"
            })
        }

        $("#monList").html(html)


    })

    $("#equList").on("click", ".onec", function () {

        var html = ""
        var dssx = ""
        var lala = ""
        const cn = parseInt($(this).attr("cn"))
        var html = ""
        var Arr = Npcchuansong.filter(function (cd) { return cd.n == cn })
        //  console.log(oneArr,cn)
        if (Arr.length > 0) {
            var Data = Arr[0].b
            $.each(Data, function (index, item) {
                html += "<div > <fieldset class='layui-elem-field'><legend> " + Name[1] + "</legend><div class='layui-field-box'>" + Name[item] + "</div></fieldset ></div >"
            })
            var may = cn
            lala = "<a style='color:red;'>" + Name[cn] + "</a>" + Name[0];

        }
        $("#mapTransferLists").html(html)
        $("#mapTransferTitle").html(lala)

    })
    $("#equList").on("click", ".onec", function () {
        var html = "Ã»ÓÐ´«ËÍ"
        const cn = parseInt($(this).attr("cn"))
        var Arr = Npcchuansong.filter(function (cd) { return cd.n == cn })
        //  console.log(oneArr,cn)
       
        if (Arr.length > 0) {
            html = ""
            html = "<div > <fieldset class='layui-elem-field'><legend> " + Name[2] + "</legend><div class='layui-field-box'>" 
            var Data = Arr[0].c
            
            $.each(Data, function (index, item) {
                html +=  Name[item] +","
            })
            html += "</div></fieldset ></div > "
            if (Arr[0].c == "") {
                html = Name[3]
            }
        }
        $("#mapTransferList").html(html)


    })

})
window.log = (function (l) { console.log(l) })