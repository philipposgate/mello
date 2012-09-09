var require = __meteor_bootstrap__.require,
	mongodb = require("mongodb"),
	Fiber 	= require("fibers");

var Mongo = Meteor._Mongo;
Future.prototype.ret = Future.prototype.return;

/*Users = new Meteor.Collection("Users");
Users.insert({firstname:"Paul", lastname:"Smith"});*/

db = new mongodb.Db('meteor', new mongodb.Server("127.0.0.1", 3002),
		{auto_reconnect: false, poolSize:4}, {native_parser:false});

Meteor.methods({
	// retrieve collection names from the database
	getCollectionNames: function() {
		
		var self = this;
		var fiber = Fiber.current;
			
		db.open(function(err, db){
				
			if(err) return fiber.throwInto(err);
			
			db.collectionNames(function(err, r){
				if(err) return fiber.throwInto(err);
				fiber.run(r);
			});
			
		});
		
		var collections = Fiber.yield(), result = [];
		
		_.each(collections, function(v){
			var c = v.name.split('.');
			if(_.size(c) == 2) {
				result.push(c[1]);
			}
		})
		
		db.close();
		return result;
		
	},
	
	// retrieve collection info from the database
	getCollectionInfo: function(collection) {
		
		var collection = new Meteor.Collection(collection);
		console.log(collection);
		return collection.find().fetch();
		
	}
});

Meteor.startup(function() {
	console.log("SERVER START");
});
