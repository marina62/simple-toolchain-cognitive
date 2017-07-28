$(document).on('click','#nlcBtn',function(){
	console.log("nlc working");
	$('#nlClassifier').show();
	console.log("nlc working");
	$('#nlUnderstanding').hide();
	console.log("nlc working");
	$('#nluBtn').removeClass('btn-highlighted');
	console.log("nlc working");
	$(this).addClass('btn-highlighted');
});
$(document).on('click','#nluBtn',function(){
	$('#nlClassifier').hide();
	$('#nlUnderstanding').show();
	$('#nlcBtn').removeClass('btn-highlighted');
	$(this).addClass('btn-highlighted');
});