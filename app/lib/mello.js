if(Meteor.is_server) 
{
	// load dependencies
	var	require = __meteor_bootstrap__.require,
		mongodb = require("mongodb"),
		Fiber 	= require("fibers");
}

// declare global application object
var Mello = {}