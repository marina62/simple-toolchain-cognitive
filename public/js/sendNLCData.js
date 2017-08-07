$(document).on('click','#submitTextNLC',function(){
	/* use the most recent classifier
	getCurrentClassifier().then(function(id){
		var classifier = JSON.parse(id);
		classifier.classifiers.sort(compare);
		//console.log(classifier);
		var max = classifier.classifiers.length -1;
		if(classifier.classifiers.length == 0)
		{
			$('#currentClassifier').append("<p id='noClass'><br>No Classifier Trained. Please train before requesting</p>");
		
		}
		else
		{
			$('#noClass').remove();
			callClassifier(classifier.classifiers[max].classifier_id);
		}
	});*/

	//use the selected classifier
	var id = $('.currentID').attr('value');
	
	getCount().then(function(count){
		console.log(count);
		var value = $('#NLCInput').val();
		callClassifier(id,value).then(function(payload){
			console.log(count);
			outputNLCData(payload.val,payload.obj,count);
		});
	});

});

function getCount(){
	var promise = new Promise(function(resolve,reject){
		var count = $('#topHeading').siblings().length + 1;
		resolve(count);
	});
	return promise;
}

function outputNLCData(input,output,count){
	//console.log(count);		
	var outTab = 'outTab' + count;
	//console.log(outTab);
	$('#nlcTable').append('<tr><td class="inTab">' + input + '</td><td class="outTab" id="'+outTab+'"></td></tr>');
	$('#' + outTab).jsonViewer(JSON.parse(output));
	$('#NLCInput').val('');
}

function statusTimer(id){
	var timer = setInterval(function(){
		checkStatus(id).then(function(stat){
			var obj = JSON.parse(stat);
			if(obj.status =="Available"){
				clearInterval(timer);
				$('.loader').hide();
				$('#currentClassifier').text("Current Classifier ID: " + obj.classifier_id);
				$('#submitTextNLC').prop("disabled",false);
				console.log('finished training');
			}
			else{
				console.log('still training');
				$('.loader').show();
			}
		});
	},60000);

}



