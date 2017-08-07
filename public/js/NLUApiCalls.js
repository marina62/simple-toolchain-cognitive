function callUnderstanding(parameters){
	var promise = new Promise(function(resolve,reject){
		var messageEndpoint = '/api/understanding';
		// Built http request
		var http = new XMLHttpRequest();
	    http.open('POST', messageEndpoint, true);
	    http.setRequestHeader('Content-type', 'application/json');
	    http.onreadystatechange = function() {
	      if (http.readyState === 4 && http.status === 200 && http.responseText) {
	    //   console.log(http.responseText);
	        resolve(http.responseText);
	        //outputNLCData(value,http.responseText);
	      }
	    };

	    var params = JSON.stringify(parameters);
	   // console.log("Params: ", params);
	    http.send(params);
	});
	return promise;
}