/**
 +----------------------------------------------------------
 * 内置扩展 [此部分可选]
 +----------------------------------------------------------
 */
var $B = $('body'), $W = $(window);
$.extend({
    /**
     * @decription 给方法添加加载方法
     * @param t : string 提示文字
     * @param w : string 提示框宽度
     * @param h : string 提示框高度
     */
    showLoading: function(t, w, h) { //显示加载
        t = t ? t : '正在加载...';
        w = w ? parseInt(w) : 140;
        h = h ? parseInt(h) : 48;
        var closeBtn = '<a style="position:absolute;top:-5px;right:-5px;width:15px;height:15px;line-height:15px;display:inline-block;border-radius:50%;text-align:center;background-color:rgba(0,0,0,0.5);color:#fff;font-size:10px;" href="javascript:;" id="closeBtn">X</a>', margin = ""+parseInt(-(h/2))+'px 0 0 '+parseInt(-(w/2))+"px";
        $('#HLoading').remove();
        $B.stop().append('<div id="HLoading" style="width:'+w+'px;height:'+h+'px;line-height:'+h+'px;border-radius:4px;background:rgba(0,0,0,0.6);color:#fff;text-align:center;position:fixed;top:50%;left:50%;margin:'+margin+';">'+t+closeBtn+'</div>');
        $('#closeBtn').on('click', function() {
            $.hideLoading();
        }); //关闭按钮点击事件
    },
    hideLoading: function() { //移除加载
        $('#HLoading').remove();
    },
    /**
     * @decription 给方法添加提示方法
     * @param t1 : string 提示文字
     * @param t2 : int 提示时间
     * @param t3 : boolean 提示类型，默认为false
     * @param callback : 回调函数
     */
    tooltip: function(t1, t2, t3, callback) {
        var tip = '', tipClassName = '', tipBgColor = '';
        t1 = t1 ? t1 : 'Error...';
        t2 = t2 ? parseInt(t2) : 3000;
        if(t3) {
            tipClassName = 'fadeInDown';
            tipBgColor = '#5cb85c';
        } else {
            tipClassName = 'shake';
            tipBgColor = '#D84C31';
        }
        tip = '<div class="HTooltip animated '+tipClassName+'" style="width:280px;padding:10px;text-align:center;background-color:'+tipBgColor+';color:#fff;position:fixed;top:10px;left:50%;z-index:100001;margin-left:-150px;box-shadow:1px 1px 5px #333;-webkit-box-shadow:1px 1px 5px #333;">'+t1+'</div>';
        if($B.find(".toast-box").length == 0) {
            $B.stop().append(tip);
        } else {
            $('.HTooltip').remove();
        }
        setTimeout(function() {
            setTimeout(function() {
                $('.HTooltip').remove();
                callback && callback(); //隐藏后的回调方法
            }, 1000);
        }, t2);
    },
    /**
     * @decription 返回顶部
     * @param b : string 和屏幕底部的距离
     * @param r : string 和屏幕右侧的距离
     */
    goTop: function(b, r) {
        b = b ? b : '30px';
        r = r ? r : '20px';
        $('#HGoTop').remove();
        $B.stop().append('<a id="HGoTop" href="javascript:;" style="width:40px;height:40px;line-height:40px;border-radius:50%;display:inline-block;text-align:center;background:#333;color:#fff;position:fixed;bottom:'+b+';right:'+r+';z-index:100000;">Top</a>').find('#HGoTop').hide();
        $T = $('#HGoTop');
        $W.on('scroll', function() {
            $W.scrollTop() > 150 ? $T.removeAttr('class').addClass('animated rollIn').show() : $T.removeAttr('class').addClass('animated rollOut');
        });
        $T.on('click', function() {
            $('body,html').animate({ scrollTop:0 },500); return; //返回顶部按钮点击事件
        });
    },
    /**
     * @decription 消息框
     * @param type : string 消息框类型(alert/confirm)
     * @param title : string 消息框标题
     * @param content : string 消息框内容
     * @param time : int 消息框自动关闭时间，以毫秒为单位(默认0：不自动关闭)
     * @param callback : 回调函数
     */
    dialog: function(type, title, content, time, callback) {
        var t, tpl = '', footerTpl = '', isLock = false, okText = '确定', cancelText = '取消', width = 260, margin = '0 0 0 '+parseInt(-(width/2))+'px', type = type != undefined ? type : 'alert', time = time != undefined ? parseInt(time) : 0,
            headerTpl = '<div id="hDialog-header" style="border-bottom:1px solid #ddd;padding:10px;font-size:1.2em;color:#333;">' + title +'</div>',
            okTpl = '<a href="javascript:;" style="padding:5px 10px;display:inline-block;border-radius:3px;background-color:#337ab7;color:#fff;" id="h_ok">'+ okText +'</a>',
            cancelTpl = '<a href="javascript:;" style="padding:5px 10px;display:inline-block;border-radius:3px;margin-left:10px;background-color:#eee;color:#333;" id="h_cancel">'+ cancelText +'</a>',
            contentTpl = '<div id="hDialog-content" style="padding:25px 15px;text-align:center;">' + content + '</div>',
            maskTpl = '<div id="hDialog-mask" style="width:100%;height:100%;background-color:rgba(0,0,0,0.6);position:fixed;top:0;left:0;z-index:99999;"></div>';
        if(type === 'confirm') {
            footerTpl = '<div id="hDialog-footer" style="padding:10px;border-top:1px solid #ddd;text-align:right;">'+ okTpl + cancelTpl +'</div>';
        }
        if(!isLock) {
            tpl += maskTpl;
        }
        tpl += '<div id="hDialog-wrap" class="animated fadeIn" style="width:'+width+'px;border-radius:5px;box-shadow:4px 4px 10px #666;-webkit-box-shadow:4px 4px 10px #666;background-color:#ffffff;border:1px solid #eee;position:fixed;top:35%;left:50%;margin:'+margin+';z-index:100000;">' + headerTpl + contentTpl + footerTpl + '</div>';
        $('#hDialog-wrap, #hDialog-mask').remove();
        $B.stop().append(tpl);
        if(time !== 0) {
            clearTimeout(t);
            t = setTimeout(function() {
                $.closeDialog(callback);
            }, time);
        }
        $('a:contains('+okText+')').on("click", function() {
            callback && callback();
        });
        $('a:contains('+cancelText+')').on("click", function() {
            $.closeDialog();
        });
    },
    /**
     * @decription 关闭消息框
     * @param callback : 回调函数
     */
    closeDialog: function(callback) {
        $('#hDialog-wrap, #hDialog-mask').remove();
        callback && callback();
    }
});
