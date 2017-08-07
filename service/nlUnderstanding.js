var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

var natural_language_understanding = new NaturalLanguageUnderstandingV1({
  'username': '0d58b2fb-8f62-4cee-94e5-a0c0e7b6b2f9',
  'password': 'mbPacs3pJ1mx',
  'version_date': '2017-02-27'
});

var app = module.exports.app = module.parent.exports.app;

app.post('/api/understanding',function(req,res,next){

	var parameters = req.body.parameters;
	natural_language_understanding.analyze(parameters, function(err, response) {
  		if (err)
    		console.log('error:', err);
  		else{
    		console.log(JSON.stringify(response, null, 2));
    		res.json(response);
  		}
	});
});