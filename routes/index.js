module.exports = function Route(app){

	//this will require the mongoose module and allow us to connect to our MongoDB server!
	var mongoose = require('mongoose');

	//let's connect!  The last part of the string is the name of the MongoDB database
	var db = mongoose.connect('mongodb://localhost/new_db');

	//now let's make a mongoose schema that will give some structure to our MongoDB collections
	var gnarwalSchema = new mongoose.Schema({
		first_name: {type: String, required: true},
		last_name: {type: String, required: true},
		age: {type: Number, required: true}
		//to make the Schema connect with an existing DB table, uncomment the line below!
		//, {collection: 'gnarwals'}
	});

	//make the actual model to interact with our DB
	var Gnarwal = mongoose.model('Gnarwal', gnarwalSchema);

	app.get('/', function(req, res){
		
	})

	app.post('/gnarwals/new', function(req, res){
		
	})
}