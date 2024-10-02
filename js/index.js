$(function(){
    var allfirsthtml=""
    //var dd={

    //}
    var a = 0;
    $.each(One, function (index, item) {
        a++;
       
            allfirsthtml += "<div class='hove onec' cn='" + item.n + "' >" + a + "、" + Name[item.n]  + "</div>"
            
       
    })
    $("#equList").html(allfirsthtml)
    //console.log(One)
    //console.log(Two)
    //console.log(Three)
    //console.log(Name)
    $("#search").on("click", function () {
        //  debugger
        var key = $("#key").val()
        
        if (key == "") {
            var a = 0;
            allfirsthtml = ""
            $.each(One, function (index, item) {
                a++;
                allfirsthtml += "<div class='hove onec' cn='" + item.n + "' >" + a + "、" + Name[item.n] + "</div>"

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
            $.each(One, function (index, item) {
                
                if (arr.indexOf(item.n) > -1) {
                    a++;
                    allfirsthtml += "<div class='hove onec' cn='" + item.n + "' >" + a + "、" + Name[item.n] + "</div>"

                }
            })
        }
            $("#equList").html(allfirsthtml)

    })
    $("#equList").on("click", ".onec", function () {
        const cn = parseInt($(this).attr("cn"))
        var html = ""
        var dssx = "没有找到"
        var lala = "没有找到"
        var Arr = One.filter(function (cd) { return cd.n == cn })
      //  console.log(oneArr,cn)
        if (Arr.length > 0) {
            
            var Data = Arr[0].c
            var a = 0;
            $.each(Data, function (index, item) {
                ++a;
                html += "<div class='hove twoc' cn='" + item + "' >" + a +"、"+ Name[item]  + "</div>"
               
            })
            var may = cn
            lala = "<a style='color:red;'>" + Name[cn] + "</a>可以在这些怪物或NPC获取（点击怪物查看地图）";
            var sx = Arr[0].b
            if (sx && sx.length > 0) {
                dssx = ""
                $.each(sx, function (index, item) {
                    dssx += "<div><a style='color:red;'>" + Name[item] + "</a></div>"
                })
            }
        }
        log(lala)
        $("#monList").html(html)
        $("#npccon").html(dssx)
        $("#monTitle").html(lala)
        
    })
    $("#monList").on("click", ".twoc", function () {
       
        const cn = parseInt($(this).attr("cn"))
        var html = ""
        var dssx ="没有找到"
        var Arr = Two.filter(function (cd) { return cd.n == cn })
        console.log(Arr,cn)
        if (Arr.length > 0) {
            var Data = Arr[0].c
            var a = 0;
           
            $.each(Data, function (index, item) {
                ++a;
                html += "<div class='hove threec' cn='" + item + "' >" + a + "、" + Name[item] + "</div>"
            })
            var sx = Arr[0].b
            var b = 0;
            if (sx && sx.length > 0) {
                dssx = ""
                $.each(sx, function (index, item) {
                    ++b;
                    dssx += "<div>" + b + "、" + Name[item] + "</div>"
                })
                var may = cn
                lala = "<a style='color:red;'>" + Name[cn] + "</a>（没有地图说明这个怪物不刷出）";   
            } 
        }
        log(dssx)
        $("#mapList").html(html)
        $("#dingshicon").html(dssx)
        $("#mapTitle").html(lala)
       
    })
    $("#mapList").on("click", ".threec", function () {

        const cn = parseInt($(this).attr("cn"))
        var html = "<div > <fieldset class='layui - elem - field'><legend> 跑图路线</legend><div class='layui-field-box'>跑图路线没有找到</div></fieldset ></div >"
        var dssx = "<div > <fieldset class='layui - elem - field'><legend> npc直传</legend><div class='layui-field-box'>npc直传没有找到</div></fieldset ></div >"
        var Arr = Three.filter(function (cd) { return cd.n == cn })
        console.log(Arr, cn)
        if (Arr.length > 0) {
            html = "";
            var Data = Arr[0].c
            $.each(Data, function (index, item) {
                html += "<div > <fieldset class='layui - elem - field'><legend> 跑图路线</legend><div class='layui-field-box'>" + Name[item] + "</div></fieldset ></div > "
            })
            var may = cn
            lala = "<a style='color:red;'>" + Name[cn] + "</a>跑图流程（没有信息说明此地图是触发进入）"; 
            var sx = Arr[0].b
            if (sx && sx.length > 0) {
                dssx = ""
                $.each(sx, function (index, item) {
                    dssx += "<div > <fieldset class='layui - elem - field'><legend> NPC直传</legend><div class='layui-field-box'>" + Name[item] + "</div></fieldset ></div > "
                })
                var may = cn
                lala = "<a style='color:red;'>" + Name[cn] + "</a>（没有地图说明这个怪物不刷出）";
            } 
        } 
        $("#mapTransferList").html(html)
        $("#mapTransferTitle").html(lala)
        $("#mapTransferLists").html(dssx)
    })

})
window.log = (function (l) { console.log(l)})