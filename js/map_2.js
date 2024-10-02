$(function () {
    var allfirsthtml = ""
    //var dd={

    //}
    $.each(Jiu, function (index, item) {
        
            allfirsthtml += "<div class='hove onec' cn='" + item.n + "' >" + Name[item.n] + "</div>"
  
        
    })
    $("#equList").html(allfirsthtml)
    
    //console.log(Xin)
    //console.log(Two)
    $("#search").on("click", function () {
        var key = $("#key").val()
        if (key == "") {
            allfirsthtml = ""
            var a = 0;
            $.each(Jiu, function (index, item) {
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
            $.each(Jiu, function (index, item) {
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
    $(".onec").click(function () {
        var cn = parseInt($(this).attr("cn"))
     
        {
            var html = ""
            var Arr = Jiu.filter(function (cd) { return cd.n == cn })
            //  console.log(oneArr,cn)
            if (Arr.length > 0) {
                var Data = Arr[0].c
                $.each(Data, function (index, item) {
                    html += "<div class='hove twoc' cn='" + item + "' >" + Name[item] + "</div>"
                })

            }

            $("#monList").html(html)
           
        }


        {
            var html = ""
            var Arr = Three.filter(function (cd) { return cd.n == cn })
            var lala = ""
            var aaa = ""
            var dssx = ""
            if (Arr.length > 0) {
                var Data = Arr[0].c
                $.each(Data, function (index, item) {
                    html += "<div > <fieldset class='layui-elem-field'><legend> </legend><div class='layui-field-box'>" + Name[item] + "</div></fieldset ></div > "
                })
                var may = cn
                lala = Name[cn];
                encodeURIComponent(lala);


                var may = cn
                aaa = "<a style='color:red;'>" + Name[cn] + "</a>";
                var sx = Arr[0].b
                if (sx && sx.length > 0) {
                    dssx = ""
                    $.each(sx, function (index, item) {
                        dssx += "<div > <fieldset class='layui-elem-field'><legend> NPC</legend><div class='layui-field-box'>" + Name[item] + "</div></fieldset ></div > "
                    })
                    var may = cn
                    aaa = "<a style='color:red;'>" + Name[cn] + "</a>";
                }
            }

            $("#mapTransferList").html(html)
            $("#monTitle").html(lala)
            $("#mapTransferTitle").html(aaa)
            $("#mapTransferLists").html(dssx)
           
        }
       
    })
  
    $("#monList").on("click", ".twoc", function () {
        var cn = parseInt($(this).attr("cn"))
        var lala = ""
        var html = ""
        var dssx = "ц╩спур╣╫"
        var Arr = Xin.filter(function (cd) { return cd.n == cn })
        console.log(Arr, cn)
        if (Arr.length > 0) {
            var Data = Arr[0].c
            $.each(Data, function (index, item) {
                html += "<div class='hove threec' cn='" + item + "' >" + Name[item] + "</div>"
            })
            var may = cn
            lala = Name[cn];
            encodeURIComponent(lala);
        }
      
        $("#mapList").html(html)
        $("#mapTitle").html(lala)
       
      
    })

   
})
window.log = (function (l) { console.log(l) })