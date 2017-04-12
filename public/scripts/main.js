$(document).ready(function () {
	$(".seletive-search .dropdown-menu li a").click(function(){
		var value = $(this).parents("li").data("value");
		var innerhtml = $(this).html();
		$(this).parents('.input-group-btn').find('.dropdown-toggle').html(innerhtml+' <span class="caret"></span>');
		$("#search_type").val(value);
	});
	windowResize = function (){
		var wWidth = $(window).width();
		if (wWidth < 600) {
			$('.poi-article > .poi-feature-image').prependTo(".poi-content");
		} else {
			$('.poi-content > .poi-feature-image').prependTo(".poi-article");
		}
	}
	$(window).on('resize', windowResize);
	windowResize();
});