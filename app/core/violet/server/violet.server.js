Meteor.methods({
	// retrieve collection names from the database
	getCollectionNames: function() {
		
		var self = this;
		var fiber = Fiber.current;
		
		db = new mongodb.Db('meteor', new mongodb.Server("127.0.0.1", 3002),
				{auto_reconnect: false, poolSize:4}, {native_parser:false});
			
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
	getCollectionInfo: function(c) {
		
		var fiber = Fiber.current;
		db = new mongodb.Db('meteor', new mongodb.Server("127.0.0.1", 3002),
				{auto_reconnect: false, poolSize:4}, {native_parser:false});
		
		db.open(function(err, db){
			
			if(err) return fiber.throwInto(err);
			
			db.collection(c, {safe:true}, function(err, r){
				if(err) return fiber.throwInto(err);
				
				r.find({}).toArray(function(err, docs) {
					if(err) return fiber.throwInto(err);
					fiber.run(docs);
				})
			});
			
		});
		
		var docs = Fiber.yield();
		
		db.close();
		return docs;
		
	}
});

Meteor.startup(function() {
	console.log("SERVER START");
});
