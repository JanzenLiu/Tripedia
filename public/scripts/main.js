$(document).ready(function () {
    $(".seletive-search .dropdown-menu li a").click(function(){
		var innerhtml = $(this).html();
		$(this).parents('.input-group-btn').find('.dropdown-toggle').html(innerhtml+' <span class="caret"></span>');
	});
});