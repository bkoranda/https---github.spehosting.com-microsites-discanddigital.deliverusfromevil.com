var today = new Date();
(function($,sr){
  var debounce = function (func, threshold, execAsap) {
      var timeout;

      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null;
          };

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 100);
      };
  }
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };
})(jQuery,'smartresize');
$.elementReady('bcr_main',function(){
	if ((today >= launch) || urlParam('date')==='post')
	{
		$(this).addClass('post_release');
		$('#bcr_buy_digital,#bcr_menu_left').removeClass('bcr_active');
		$('#bcr_buy_br,#bcr_menu_center').addClass('bcr_active');
	}
});
jQuery(function($){
	if (!bowser.mobile)
	{
		var timer = setTimeout(function(){
			$.magnificPopup.open({
				items: {
					src: trailerURL
				},
				type: 'iframe',
				mainClass: 'bcr_overlay_magnific'
			});
		},2000);
		$('a').click(function(){ clearTimeout(timer); });
	}
	
	$('.bcr_coming_soon').click(function(){
		swal({
  			title: 'Coming Soon!',
  			type: 'warning',
  			confirmButtonText: 'OK',
			confirmButtonColor: '#961c20',
			allowOutsideClick: true
		});
	});
	
	//if ((!bowser.mobile) && (!bowser.tablet))
	if (!(bowser.mobile || bowser.tablet))
	{
		$('head').append('<link rel="stylesheet" type="text/css" href="styles/hover-min.css" media="screen" />');
	}
	
	$('#bcr_watch a').magnificPopup({
		type: 'iframe',
		disableOn: function() {
  			if (bowser.mobile) { $('#bcr_watch a').attr('target','_blank'); return false; } 
  			return true;
		},
		mainClass: 'bcr_overlay_magnific'
	});
	$('#bcr_buy_digital').click(function(){
		$(this).add('#bcr_menu_left').addClass('bcr_active');
		$('#bcr_buy_br,#bcr_buy_dvd,#bcr_menu_center,#bcr_menu_right').removeClass('bcr_active');
	});
	$('#bcr_buy_br').click(function(){
		$(this).add('#bcr_menu_center').addClass('bcr_active');
		$('#bcr_buy_digital,#bcr_buy_dvd,#bcr_menu_left,#bcr_menu_right').removeClass('bcr_active');
	});
	$('#bcr_buy_dvd').click(function(){
		$(this).add('#bcr_menu_right').addClass('bcr_active');
		$('#bcr_buy_digital,#bcr_buy_br,#bcr_menu_center,#bcr_menu_left').removeClass('bcr_active');
	});
	$('.bcr_close').click(function(){
		var par = $(this).parent();
		par.add(par.prev()).removeClass('bcr_active');
	});
	
	$('#bcr_mobile_menu ul li span').click(function(){
		$(this).next().slideToggle(300).parent().toggleClass('bcr_active').siblings().removeClass('bcr_active').find('ul').removeAttr('style');
	});
	
	$('#bcr_mobile_menu_cta').click(function(){
		var m = $('#bcr_mobile_menu');
		$(this).toggleClass('bcr_active');
		m.toggleClass('bcr_active');
		((this.tog = !this.tog) ? m.removeAttr('style') : m.css('top',-(m.height()+8)));
	});
	
	resizer();
    $(window).smartresize(resizer);
	
});
resizer = function()
{
	if (($(window).width() > 949) && ( !$('#bcr_menu_left,#bcr_menu_center,#bcr_menu_right').hasClass('bcr_active') ))
	{
		$('#bcr_buy_digital,#bcr_menu_left').addClass('bcr_active');
	}
}
function getAnchorAndAreaLinks(){ return $('a,area'); }
function urlParam(name)
{
	var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if (!results) { return 0; }
	return results[1] || 0;
}