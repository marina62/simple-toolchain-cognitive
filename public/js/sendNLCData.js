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
	callClassifier(id);

});

function callClassifier(id){
	var promise = new Promise(function(resolve,reject){
		var value = $('#NLCInput').val();
		var apiCall = {
			"text": value,
			"classifier_id": id
		};
		console.log(apiCall);

		var messageEndpoint = '/api/classifier';
		// Built http request
		var http = new XMLHttpRequest();
	    http.open('PUT', messageEndpoint, true);
	    http.setRequestHeader('Content-type', 'application/json');
	    http.onreadystatechange = function() {
	      if (http.readyState === 4 && http.status === 200 && http.responseText) {
	        console.log(http.responseText);
	        outputNLCData(value,http.responseText);
	      }
	    };

	    var params = JSON.stringify(apiCall);
	    console.log("Params: ", params);
	    http.send(params);
	});
	return promise;
}


function outputNLCData(input,output){		
	$('#nlcTable').append('<tr><td class="inTab">' + input + '</td><td class="outTab">'+output+'</td></tr>');
	$('#NLCInput').val('');
}


function compare(a,b){
	if(a.created < b.created)
		return -1;
	if(a.created > b.created)
		return 1;
	return 0;
}

function getCurrentClassifier(){
	var promise = new Promise(function(resolve,reject){
		var messageEndpoint = '/api/classifierList';
		console.log("preparing request");
		var http = new XMLHttpRequest();
		http.open('GET', messageEndpoint, true);
		http.setRequestHeader('Content-type', 'application/json');
		http.onreadystatechange = function() {
			if (http.readyState === 4 && http.status === 200 && http.responseText) {
				//console.log(http.responseText);
				//resolve(http.responseText);
				resolve(http.responseText);
			}
		};
		
		http.send();
	});
	return promise;
}