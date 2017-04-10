$(document).ready(function () {
	$(".seletive-search .dropdown-menu li a").click(function(){
		var value = $(this).parents("li").data("value");
		var innerhtml = $(this).html();
		$(this).parents('.input-group-btn').find('.dropdown-toggle').html(innerhtml+' <span class="caret"></span>');
		$("#search_type").val(value);
	});
});