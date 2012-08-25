Meteor.accounts.config({
  requireEmail: false,
  requireUsername: true,
  validateEmails: true
});

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
