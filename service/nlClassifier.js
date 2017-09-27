var watson = require('watson-developer-cloud');
var formidable = require('formidable');


var natural_language_classifier = watson.natural_language_classifier({
  url: "https://gateway.watsonplatform.net/natural-language-classifier/api",
  username: '6e57464b-4731-4b84-bffa-1a61acf48bf8',   /*NLC Username here*/
  password: 'ekhJ2NZreEC6' ,             /*NLC Username here*/
  version: 'v1'
});

var app = module.exports.app = module.parent.exports.app;
//console.log(app);
var fs = require('fs');

app.put('/api/trainClassifier',function(req,res,next){

	console.log(req.body.data);
	var params = {
	  language: 'en',
	  name: 'My Classifier',
	  //training_data: fs.createReadStream('./service/training/train.csv')
	  training_data: req.body.data
	};

	natural_language_classifier.create(params, function(err, response) {
	  if (err)
	    console.log(err);
	  else{
	    console.log(JSON.stringify(response, null, 2));
	 	res.json(response);
	 }
	});
});

app.get('/api/classifierList',function(req,res,next){
	natural_language_classifier.list({},
		function(err, response) {
		    if (err)
		        console.log('error:', err);
		      else{
		        //console.log(JSON.stringify(response, null, 2));
		    	res.json(response);
		    }
		});
});
app.get('/api/classifierStatus',function(req,res,next){
	//console.log(req.query.classifier);
	natural_language_classifier.status({
  		classifier_id: req.query.classifier },
  		function(err, response) {
    		if (err)
      			console.log('error:', err);
    		else{
      			//console.log(JSON.stringify(response, null, 2));
      			res.json(response);
    		}
	});
});
app.delete('/api/deleteClassifier',function(req,res,next){
	natural_language_classifier.remove({
  		classifier_id: req.body.classifier },
	  	function(err, response) {
	    	if (err)
	      		console.log('error:', err);
	    	else
	      		res.json(response);
	});
});
app.put('/api/classifier',function(req,res,next){
	natural_language_classifier.classify({
  			text: req.body.text,
  			//'359f41x201-nlc-226021' 
  			classifier_id: req.body.classifier_id },
  		function(err, response) {
    		if (err){
      			console.log('error:', err);
      			res.json("not trained yet");
      		}
    		else{
      			console.log(JSON.stringify(response, null, 2));
      			res.json(response);
    		}
	});
});