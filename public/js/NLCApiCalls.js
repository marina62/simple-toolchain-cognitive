//implements all calls to the NLC Service
function callClassifier(id,value){
	var promise = new Promise(function(resolve,reject){
		var apiCall = {
			"text": value,
			"classifier_id": id
		};
		//console.log(apiCall);

		var messageEndpoint = '/api/classifier';
		// Built http request
		var http = new XMLHttpRequest();
	    http.open('PUT', messageEndpoint, true);
	    http.setRequestHeader('Content-type', 'application/json');
	    http.onreadystatechange = function() {
	      if (http.readyState === 4 && http.status === 200 && http.responseText) {
	       // console.log(http.responseText);
	        resolve({'val':value, 'obj':http.responseText});
	        //outputNLCData(value,http.responseText);
	      }
	    };

	    var params = JSON.stringify(apiCall);
	    //console.log("Params: ", params);
	    http.send(params);
	});
	return promise;
}

function getCurrentClassifier(){
	var promise = new Promise(function(resolve,reject){
		var messageEndpoint = '/api/classifierList';
		//console.log("preparing request");
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


function sendFile(file){
	var promise = new Promise(function(resolve,reject){
		//var arr = file.split(',');
		//console.log(file);
		var apiCall = {
			'data': file
		};

		var messageEndpoint = '/api/trainClassifier';
		// Built http request
		var http = new XMLHttpRequest();
	    http.open('PUT', messageEndpoint, true);
	    http.setRequestHeader('Content-type', 'application/json');
	    http.onreadystatechange = function() {
	      if (http.readyState === 4 && http.status === 200 && http.responseText) {
	        //console.log(http.responseText);
	        resolve(http.responseText);
	      }
	    };

		var params = JSON.stringify(apiCall);
	    //console.log("Params: ", params);
	    http.send(params);
	});

	return promise;
}
function deleteClassifier(id){
	var promise = new Promise(function(resolve,reject){
		var apiCall = {
				'classifier': id
			};

			var messageEndpoint = '/api/deleteClassifier';
			// Built http request
			var http = new XMLHttpRequest();
		    http.open('DELETE', messageEndpoint, true);
		    http.setRequestHeader('Content-type', 'application/json');
		    http.onreadystatechange = function() {
		      if (http.readyState === 4 && http.status === 200 && http.responseText) {
		        //console.log(http.responseText);
		        resolve(http.responseText);
		      }
		    };

			var params = JSON.stringify(apiCall);
		    console.log("Params: ", params);
		    http.send(params);
	});
	return promise;
}
function compare(a,b){
	if(a.created < b.created)
		return -1;
	if(a.created > b.created)
		return 1;
	return 0;
}