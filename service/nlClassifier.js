var watson = require('watson-developer-cloud');

var natural_language_classifier = watson.natural_language_classifier({
  url: "https://gateway.watsonplatform.net/natural-language-classifier/api",
  username: '382db703-60d7-4e00-862f-bd1debb44231',
  password: 'EzK8JZkgYiMi',
  version: 'v1'
});

var app = module.exports.app = module.parent.exports.app;
//console.log(app);
var fs = require('fs');

app.get('/api/trainClassifier',function(req,res,next){

	var params = {
	  language: 'en',
	  name: 'My Classifier',
	  training_data: fs.createReadStream('./service/training/train.csv')
	};

	natural_language_classifier.create(params, function(err, response) {
	  if (err)
	    console.log(err);
	  else
	    console.log(JSON.stringify(response, null, 2));
	 	res.json(response);
	});
});

app.get('/api/classifierID',function(req,res,next){
	natural_language_classifier.list({},
		function(err, response) {
		    if (err)
		        console.log('error:', err);
		      else
		        console.log(JSON.stringify(response, null, 2));
		});
});

app.put('/api/classifier',function(req,res,next){

	natural_language_classifier.classify({
  			text: req.body.text,
  			classifier_id: '359f41x201-nlc-226021' },
  		function(err, response) {
    		if (err)
      			console.log('error:', err);
    		else{
      			console.log(JSON.stringify(response, null, 2));
      			res.json(response);
    		}
});
});