;(function (window,$) {
	var document = window.document;
	$(document).ready(function(){
	
		//ページ内スクロール
		$('a[href^=#]').click(function() {
			var speed = 400;
			var href= $(this).attr("href");
			var target = $(href == "#" || href == "" ? 'html' : href);
			var position = target.offset().top;
			var body = 'html,body';
			if (navigator.userAgent.match(/MSIE|Firefox|Opera/)) {
				 body = 'html';
			}
			if (isMSIE11() !== false) {
				body = 'html';
			}


			$(body).stop().animate({scrollTop:position}, speed,'swing');
			return false;
		});

		//ロールオーバー
		$('a img').hover(function(){
			$(this).attr('src', $(this).attr('src').replace('_off', '_on'));
			}, function(){
			if (!$(this).closest('li').hasClass('current')) {
			$(this).attr('src', $(this).attr('src').replace('_on', '_off'));
			}
		});
		
		$('.on').on({
		'mouseenter':function(){
			$(this).find('a').stop().animate({'opacity':0.7},300);
		},
		'mouseleave':function(){
			$(this).find('a').stop().animate({'opacity':1},300);
		}
		});
		
		$('.onImg').on({
		'mouseenter':function(){
			$(this).stop().animate({'opacity':0.7},0);
		},
		'mouseleave':function(){
			$(this).stop().animate({'opacity':1},0);
		}
		});
		
		
//		$('.current').find('a').css('opacity',0);
//		$('#gNav li').on({
//		'mouseenter':function(){
//			$(this).find('a').stop().animate({'opacity':0},300);
//		},
//		'mouseleave':function(){
//			$(this).find('a').stop().animate({'opacity':1},300);
//			if($(this).hasClass('current')){
//				$(this).find('a').stop().animate({'opacity':0},0);
//			}
//		}
//		});
		
		//ページトップ
		var topBtn = $('#pagetop');
		topBtn.hide();
		//スクロールが100に達したらボタン表示
		$(window).scroll(function () {
			if ($(this).scrollTop() > 100) {
				topBtn.fadeIn();
			} else {
				topBtn.fadeOut();
			}
		});
		
		//アコーディオン
		$('.newsContent').hide();
		
		$(document).on('click', '.newsTitIn', function() {
		if ($(this).hasClass('off')) {
		$(this).removeClass('off').addClass('on').parent('div').next('div').stop().slideDown(300);
		 } else {
		$(this).removeClass('on').addClass('off').parent('div').next('div').stop().slideUp(300);
		}
		});
		
		//テルリンク
		 var ua = navigator.userAgent;
		if(ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0){
			//テキスト
			$('.telLink').each(function(){
				var str = $(this).text();
				$(this).html($('<a>').attr('href', 'tel:' + str.replace(/-/g, '')).append(str + '</a>'));
			});
			//画像
			$('.telLinkImg img').each(function(){
				var alt = $(this).attr('alt');
				$(this).wrap($('').attr('href', 'tel:' + alt.replace(/-/g, '')));
			});
		}
		
		//placeholderのIE8，9対応（placeholder 属性の値と同じ文字列をサブミットできません）
		var supportsInputAttribute = function (attr) {
			var input = document.createElement('input');
			return attr in input;
		};
		if (!supportsInputAttribute('placeholder')) {
		$('[placeholder]').each(function () {
			var
			input = $(this),
			placeholderText = input.attr('placeholder'),
			placeholderColor = 'GrayText',
			defaultColor = input.css('color');
			input.
			focus(function () {
			  if (input.val() === placeholderText) {
				input.val('').css('color', defaultColor);
			  }
			}).
			blur(function () {
			  if (input.val() === '') {
				input.val(placeholderText).css('color', placeholderColor);
			  } else if (input.val() === placeholderText) {
				input.css('color', placeholderColor);
			  }
			}).
			blur().
			parents('form').
			  submit(function () {
				if (input.val() === placeholderText) {
				  input.val('');
				}
			  });
		});
		}

		//fvの高さ固定
//		function adjust(){
//			var w_height = window.innerHeight ? window.innerHeight: $(window).height();
//			var h = w_height-150; //ウィンドウの高さ
//			$('.fv').css('height', h); //可変部分の高さを適用
//			$('.inner').css({height:h+'px'});
//		}
//		adjust();
//		$(window).on('resize', function(){
//			adjust();
//		})
		

		//タブ
//		if (location.hash === '#drink') {
//			$('#drinkBtn').addClass('active').prev('li').removeClass('active');;
//			$('#food').hide();
//			$('#drink').show();
//		} else {
//			$('#drink').hide();
//		}
//		$('#foodBtn').click(function(){
//			$(this).addClass('active').next('li').removeClass('active');
//			$('#drink').hide();
//			$('#food').fadeIn();
//		});
//		$('#drinkBtn').click(function(){
//			$(this).addClass('active').prev('li').removeClass('active');;
//			$('#food').hide();
//			$('#drink').fadeIn();
//		});

		
		//途中から固定するナビ
//		if ($('#fdTabBtn').length) {
//			var nav    = $('#fdTabBtn');
//			var offset = nav.offset().top;
//			$(window).scroll(function () {
//				if($(window).scrollTop() + $('#topFixed').height() > offset) {
//					nav.addClass('fixed');
//				} else {
//					nav.removeClass('fixed');
//				}
//			});
//		}
		
		
	});
})(this,jQuery);

//ページ内スクロール設定
function isMSIE11() {
	var ua, isIE, array, version;

	// UserAgetn を小文字に正規化
	ua = window.navigator.userAgent.toLowerCase();

	// IE かどうか判定
	isIE = (ua.indexOf('msie') >= 0 || ua.indexOf('trident') >= 0);

	// IE の場合、バージョンを取得
	if (isIE) {
		array = /(msie|rv:?)\s?([\d\.]+)/.exec(ua);
		version = (array) ? array[2] : '';
	}
	if (version == '11.0') {
		return true;
	} else {
		return false;
	}
}