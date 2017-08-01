$(document).ready(function(){
	console.log("initiating");
	getCurrentClassifier().then(function(id){
		var classifier = JSON.parse(id);
		classifier.classifiers.sort(compare);
		console.log(classifier);
		var max = classifier.classifiers.length -1;
		if(classifier.classifiers.length == 0){
			$('#currentClassifier').text("<p id='noClass'>No Current Classifiers Found</p>");
		}
		else{
			$('#currentClassifier').text("Current Classifier ID: " + classifier.classifiers[max].classifier_id);
			$('#currentClassifier').append("<br>*This is the most recent classifier that has been uploaded");
		}
		checkStatus(classifier.classifiers[max].classifier_id).then(function(stat){
			isAvailable(JSON.parse(stat));
		});
		loadSidenav();
	});
	//$('#currentClassifier')
});
function isAvailable(status){
	if(status.status == "Available"){
		//console.log(status);
		$('#submitTextNLC').prop("disabled",false);
	}
	else{
		//console.log(status);
		$('#submitTextNLC').prop("disabled",true);
		//console.log('adding');
		$('#currentClassifier').append("<br>Classifier is still training");
	}
}
function checkStatus(id){
	var promise = new Promise(function(resolve,reject){
		var messageEndpoint = '/api/classifierStatus?classifier=' +id;
		//console.log("preparing request");
		var apiCall = {
			'classifier':id
		};
		var http = new XMLHttpRequest();
		http.open('GET', messageEndpoint, true);
		http.setRequestHeader('Content-type', 'application/json');
		http.onreadystatechange = function() {
			if (http.readyState === 4 && http.status === 200 && http.responseText) {
				resolve(http.responseText);
			}
		};
		var params = JSON.stringify(apiCall);
	    //console.log("Params: ", params);
	    http.send(params);
	});	
	return promise;
}
function loadSidenav(){
	getCurrentClassifier().then(function(id){
		var idObj = JSON.parse(id);
		idObj.classifiers.sort(compare);
		idObj.classifiers.forEach(function(temp,index){
			if(index==idObj.classifiers.length -1)
			{
				$('#classifierList').append('<div class="listItem"><a class="idNum currentID" value="' + temp.classifier_id+'">Classifier ID: ' + temp.classifier_id + '<br>Created: ' + temp.created + '</a><a class="deleteClass"><img src="images/trash.png"></a></div>');
			
			}
			else{
				$('#classifierList').append('<div class="listItem"><a class="idNum" value="' + temp.classifier_id+'">Classifier ID: ' + temp.classifier_id + '<br>Created: ' + temp.created + '</a><a class="deleteClass"><img src="images/trash.png"></a></div>');
			}
		});
	});
}