$(document).on('click','#nlcBtn',function(){
	$('#nlClassifier').show();
	$('#nlUnderstanding').hide();
	$('#home').hide();
	$('#homeBtn').removeClass('active');
	$('#nluBtn').removeClass('active');
	$(this).addClass('active');
});


$(document).on('click','#nluBtn',function(){
	$('#nlClassifier').hide();
	$('#home').hide();
	$('#nlUnderstanding').show();
	$('#homeBtn').removeClass('active');
	$('#nlcBtn').removeClass('active');
	$(this).addClass('active');
});
$(document).on('click','#homeBtn',function(){
	$('#nlClassifier').hide();
	$('#nlUnderstanding').hide();
	$('#home').show();
	$('#nluBtn').removeClass('active');
	$('#nlcBtn').removeClass('active');
	$(this).addClass('active');
});