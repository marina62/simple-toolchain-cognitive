$(document).on('click','#submitTextNLC',function(){

		var value = $('#NLCInput').val();
		var apiCall = {
			"text": value
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
	        outputNLCData(http.responseText);
	      }
	    };

	    var params = JSON.stringify(apiCall);
	    console.log("Params: ", params);
	    http.send(params);

});

function outputNLCData(obj){
	$('#NLCOutput').text(obj);
}