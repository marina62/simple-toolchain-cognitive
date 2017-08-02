/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "30%";
    document.getElementById("main").style.marginLeft = "30%";
    
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    
}

$(document).on('click','.idNum',function(){
	var id = $(this).attr('value');
	$('#currentClassifier').text("Current Classifier ID: " + id);
	checkStatus(id).then(function(stat){
			isAvailable(JSON.parse(stat));
		});	
	$('.currentID').removeClass('currentID');
	$(this).addClass('currentID');
});

$(document).on('click','.deleteClass',function(){
	var $sib = $(this).siblings('.idNum');
	var $par = $(this).parent();
	deleteClassifier($sib.attr('value')).then(function(){
		$par.hide('slow',function(){
			$par.remove();
		});
	});

	
});
