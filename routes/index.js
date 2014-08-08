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
		//or configuration objects...
	}//, {collection: 'gnarwals'}
	);

	//make the actual model to interact with our DB
	var Gnarwal = mongoose.model('Gnarwal', gnarwalSchema);

	app.get('/', function(req, res){
		//callback or probremz!
		Gnarwal.find({}, function(errors, all_gnarwals) {
			// if(errors) {
				console.log(all_gnarwals);
				//render has to go into the callback to have access to the query data
				res.render('index', { title: 'ballin w/ gnarwals!!!!!!!!!!!', gnarwals: all_gnarwals })
				
			// }
		})
	})

	app.post('/gnarwals/new', function(req, res){
		var new_gnarwal = new Gnarwal(req.body);
		//anytime we ping a database, must use callback to make world right again!
		new_gnarwal.save(function(errors){
			if(errors) {
				res.redirect('/');
			} else {
				res.redirect('/');
			}
		})
	})

	app.get('/gnarwals/destroy/:id', function(req, res) {
		Gnarwal.remove({ _id: req.params.id}, function(errors) {
			console.log('KEELED DUR NARWALLL.');
			res.redirect('/');
		})
	})

	app.get('/gnarwals/edit/:id', function(req, res) {
		Gnarwal.find({ _id: req.params.id }, function(errors, updatingGnarwal) {
			res.render('edit', { title: "UPDATE DIS GNRUWL", gnarwal: updatingGnarwal })
		})
	})

	app.post('/gnarwals/update', function(req, res) {
		Gnarwal.update({ _id: req.body._id },
			{ first_name: req.body.first_name,
			  last_name: req.body.last_name,
			  age: req.body.age },
			function(errors) {
				res.redirect('/');
		})
	})
}