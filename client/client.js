Session.set('loggedIn', null);

Meteor.startup(function(){
	console.log("startup: " + new Date());
	Backbone.history.start({pushState: true});
	Session.set('loggedIn', !_.isEmpty(Meteor.user()));
});

function onLogin()
{
	console.log("onLogin(): " + new Date());
	Session.set('loggedIn', true);
}

function onLogout()
{
	console.log("onLogout(): " + new Date());
	Session.set('loggedIn', false);
}

Template.main.loggedIn = function() {
	return Session.get('loggedIn');
};

Template.home.greeting = function () {
  return "Watch the client & server consoles while you click this button: ";
};

Template.home.events = {
  'click input' : function () {
  		Meteor.call("foo", function(error, result) {
  			console.log("\n" + new Date());
  			console.log(error);
  			console.log(result);
  			console.log(Meteor.user());
		});
  }
};
