$(document).on('click','#submitTextNLU',function(){
	//console.log($('#concepts').is(':checked'));
	var parameters = {
		'parameters':{
			'text': $('#NLUInput').val(),
			'features': {}
		}
	}
	if($('#concepts').is(':checked')){
		parameters.parameters.features.concepts = conceptsChecked();
	}
	if($('#categories').is(':checked')){
		parameters.parameters.features.categories = categoriesChecked();
	}
	if($('#emotion').is(':checked')){
		parameters.parameters.features.emotion = emotionChecked();
	}
	if($('#entities').is(':checked')){
		parameters.parameters.features.entities = entitiesChecked();
	}
	if($('#keywords').is(':checked')){
		parameters.parameters.features.keywords = keywordsChecked();
	}
	if($('#metadata').is(':checked')){
		parameters.parameters.features.metadata = metadataChecked();
	}
	if($('#relations').is(':checked')){
		parameters.parameters.features.relations = relationsChecked();
	}
	if($('#semantic_roles').is(':checked')){
		parameters.parameters.features.semantic_roles = semantic_rolesChecked();
	}
	if($('#sentiment').is(':checked')){
		parameters.parameters.features.sentiment = sentimentChecked();
	}
	if(Object.keys(parameters.parameters.features).length == 0){
		console.log("undefined")
		delete parameters.parameters.features;
	}
	console.log(typeof parameters);
	getCount().then(function(count){
		callUnderstanding(parameters).then(function(payload){
			outputNLUData($('#NLUInput').val(),payload,count);
		});
	});
});


function conceptsChecked(){
	var parameters = {
      	'limit': 3
	};
	return parameters;
}
function categoriesChecked(){
	var parameters = {
	};
	return parameters;
}
function emotionChecked(){
	var parameters = {
	
	};
	return parameters;
}
function entitiesChecked(){
	var parameters = {
		'sentiment':true,
		'limit':2
	};
	return parameters;
}
function keywordsChecked(){
	var parameters = {
      'sentiment': true,
      'emotion': true,
      'limit': 3
	};
	return parameters;
}
function metadataChecked(){
	var parameters = {
	
	};
	return parameters;
}
function emotionChecked(){
	var parameters = {
	
	};
	return parameters;
}
function relationsChecked(){
	var parameters = {
	
	};
	return parameters;
}
function semantic_rolesChecked(){
	var parameters = {
	
	};
	return parameters;
}
function sentimentChecked(){
	var parameters = {
	
	};
	return parameters;
}

function outputNLUData(input,output,count){
	//console.log(count);		
	var outTab = 'outTabU' + count;
	//console.log(outTab);
	$('#nluTable').append('<tr><td class="inTabU">' + input + '</td><td class="outTabU" id="'+outTab+'"></td></tr>');
	$('#' + outTab).jsonViewer(JSON.parse(output));
	$('#NLCInput').val('');
}
function getCountU(){
	var promise = new Promise(function(resolve,reject){
		var count = $('#topHeadingU').siblings().length + 1;
		resolve(count);
	});
	return promise;
}