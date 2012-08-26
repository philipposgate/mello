
Meteor.startup(function(){
	console.log("startup: " + new Date());
	Backbone.history.start({pushState: true});
});

function onLogin()
{
	console.log("onLogin(): " + new Date());
}

function onLogout()
{
	console.log("onLogout(): " + new Date());
}

Template.main.connected = function() {
	return Meteor.status().connected && Meteor.status().status != "waiting";
};

Template.notConnected.waiting = function() {
	return Meteor.status().status === "waiting";
};

Template.home.events = {
  'click .callFoo' : function() {
	Meteor.call("foo", function(error, result) {
		console.log("\n" + new Date());
		console.log(error);
		console.log(result);
		console.log(Meteor.user());
	 	});
        }

};


