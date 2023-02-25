(function( $ ) {
    let settings = [];
    let head_hei = 0;

    $.fn.autoScroll = function( options ) {

        /*
        hash_tag: スクロールさせたい箇所のID属性(#point)
        head_elm: スクロール時についてくるナビゲーションのID属性($('#header'))
        hand_mag: スクロール位置の手動調整値(10)
        scrl_spd: スクロールスピード(400)
        */

        // 情報をセット
        settings = $.extend({
            'hash_tag' : location.hash,
            'user_agt' : window.navigator.userAgent.toLowerCase(),
            'head_elm' : $('#header'),
            'hand_mag' : 10,
            'scrl_spd' : 400,
            'scrl_sta' : function(){},
            'scrl_end' : function(){}
        }, options);

        if (settings.head_elm.length > 0) head_hei = settings.head_elm.outerHeight();

        if (settings.hash_tag.length > 0) {
            settings['scrl_sta']();

            if (settings.user_agt.indexOf('msie') == -1 && settings.user_agt.indexOf('firefox') != -1) {
                // IE, Firefox
                pageScroll();
            } else {
                // 以外
                var isHtmlScrollable = (function(){
                    const html_elm = $('html');
                    const html_top  = html_elm.scrollTop();
                    const temp_elm  = $('<div/>').height(10000).prependTo('body');

                    html_elm.scrollTop(10000);
                    const rs = !!html_elm.scrollTop();
                    html_elm.scrollTop(html_top - settings.hand_mag);
                    temp_elm.remove();
                    return rs;
                })();

                const target = $(settings.hash_tag);
                const pos    = target.offset().top - head_hei - settings.hand_mag;
                $(isHtmlScrollable ? 'html' : 'body').stop().animate({
                    scrollTop: 0
                }, 0, 'swing', function () {
                    $(isHtmlScrollable ? 'html' : 'body').stop().animate({
                        scrollTop: pos
                    }, settings.scrl_spd, 'swing', function () {
                        settings['scrl_end']();
                    });
                });
            }
        }

    };

    function pageScroll() {
        const target   = $(settings.hash_tag == '#' || settings.hash_tag == '' ? 'html' : settings.hash_tag);
        const position = target.offset().top - head_hei - settings.hand_mag;
        let body       = 'body';
        if (navigator.userAgent.match(/MSIE|Firefox|Opera/) || isMSIE11() !== false) body = 'html';

        $(body).stop().animate({
            scrollTop : 0
        }, 0, 'swing', function () {
            $(body).stop().animate({
                scrollTop : position
            }, settings.scrl_spd, 'swing', function () {
                settings['scrl_end']();
            });
        });

        return false;
    }

    function isMSIE11() {
        let isIE, version;
        let match = [];

        // IE かどうか判定
        isIE = (settings.user_agt.indexOf('msie') >= 0 || settings.user_agt.indexOf('trident') >= 0);

        // IE の場合、バージョンを取得
        if (isIE) {
            match   = /(msie|rv:?)\s?([\d\.]+)/.exec(settings.user_agt);
            version = (match) ? match[2] : '';
        }
        if (version == '11.0') {
            return true;
        } else {
            return false;
        }
    }
})( jQuery );