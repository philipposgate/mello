Meteor.startup(function(){
	console.log("startup: " + new Date());
});

function onLogin()
{
	console.log("onLogin(): " + new Date());
}

function onLogout()
{
	console.log("onLogout(): " + new Date());
}

Template.hello.greeting = function () {
  return "Watch the client & server consoles while you click this button: ";
};

Template.hello.events = {
  'click input' : function () {
  		Meteor.call("foo", function(error, result) {
  			console.log("\n" + new Date());
  			console.log(error);
  			console.log(result);
  			console.log(Meteor.user());
		});
  }
};
