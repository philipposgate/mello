
Meteor.startup(function(){
	console.log("startup: " + new Date());
	Backbone.history.start({pushState: true});

	var mainContent = Meteor.ui.render(function(){
		var content;
		if (isConnected())
		{
			if (Meteor.user())
			{
				content = Template.projects();
			}
			else
			{
				content = Template.home();
			}
		}
		else
		{
				content = Template.notConnected();
		}
		return content;
	});
	$("div#mainContent").html(mainContent);

});

function onLogin()
{
	console.log("onLogin(): " + new Date());
}

function onLogout()
{
	console.log("onLogout(): " + new Date());
}

function isConnected() {
	return Meteor.status().connected && Meteor.status().status != "waiting";
};

function isLoggedIn() {
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


