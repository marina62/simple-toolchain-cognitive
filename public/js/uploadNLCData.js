$(document).on('click','#submitNLCFile',function(){
	//send file

	var fileInput = document.getElementById('csvFile');
	var input = fileInput.files[0];
	
	readFile(input,function(e){
		console.log(e.target.result);
		console.log(typeof e.target.result);
		sendFile(e.target.result).then(function(){
			getCurrentClassifier().then(function(id){
				var idObj = JSON.parse(id);
				idObj.classifiers.sort(compare);
				idObj.classifiers.forEach(function(temp,index){
					if(index==idObj.classifiers.length -1)
					{
						$('#classifierList').append('<div class="listItem"><a class="idNum" value="' + temp.classifier_id+'">Classifier ID: ' + temp.classifier_id + '<br>Created: ' + temp.created + '</a><a class="deleteClass"><img src="images/trash.png"></a></div>');
					}
				});
			});
			$('#submitNLCFile').hide();
			var fileInput = document.getElementById('csvFile');
			fileInput.value = '';
		});
	});
	//load until model trained

});

function fileCheck(){
	var fileInput = document.getElementById('csvFile');
	//console.log(fileInput.files[0]);
	var filePath = fileInput.value;
	var allowedExtensions = /(\.csv)$/i;
	if(!allowedExtensions.exec(filePath)){
		$('#uploadContainer').append("<br><p id ='alert'>Please upload a .csv file</p>");
		fileInput.value='';
		$('#submitNLCFile').hide();
	}	
	else{
		$('#alert').remove();
		console.log("correct csv file");
		$('#submitNLCFile').show();
	}
	//console.log(fileInput.value);
}
function readFile(file, callback){
		console.log("reading File");
		var reader = new FileReader();
		reader.onload = callback;
		reader.readAsText(file);
}


