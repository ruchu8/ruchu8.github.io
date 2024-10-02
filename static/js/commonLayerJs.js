var commonLayerJs = {
    //网络繁忙，请稍后再试。
    MessageError: "网络繁忙，请稍后再试。",
    MessageSuccess: "操作成功",
    //操作正在进行，请稍后。
    MessageDoing: "请稍后。",
    //您还未登录，请登录。
    MessageLoginOut: "您还未登录或登录超时，请登录。",
    //msg:消息内容。
    Msg: function (msg, callback,param) {
        //alert(msg);
        var def = {
            time: 2000, //2秒关闭（如果不配置，默认是3秒）
            anim: -1 //关闭抖动效果
        }
        param = $.extend({}, param, def);
        layer.msg(msg, param, callback);
    },
    //待回调的确认
    Alert: function (msg, callback) {
        //common.commonAlert(msg, callback);
        //layer.alert(msg, callback);
        var index = layer.alert(msg, function () {
            layer.close(index);
            if (callback) {
                callback();
            }
        });
    },
    Confirm: function (msg, callback, callback2) {
        //common.commonConfirm(msg, callback, callback2);
        var index= layer.confirm(msg, {
               btn: ['确定', '取消'] //按钮
           }, function () {
               if (callback) {
                   callback();
               }
               layer.close(index);
           }, function () {
               if (callback2) {
                   callback2();
               }
           });
        //if (confirm(msg)) {
        //    if (callBack) {
        //        callBack();
        //    }
        //} else {
        //    if (callback2) {
        //        callback2();
        //    }
        //}
    },
};