var Router = Backbone.Router.extend({
	routes: {
		"*action" : "defaultRoute"
	},
	
	defaultRoute: function(action) {
		if(!action || typeof Template[action] === "undefined") {
			action = "home";
		}
		else if (Template[action].authRequired && !Meteor.user())
		{
		    action = "notLoggedIn";
		}
		$("#mainContent").html(Meteor.render(function(){return Template[action]()}));
	}
});

var	router = new Router;

Meteor.startup(function() {
	Backbone.history.start({pushState: true});
});

function onLogin()
{
    router.navigate("/home", {trigger: true});
}

function onLogout()
{
    router.navigate("/home", {trigger: true});
}

Template.notConnected.waiting = function() {
	return Meteor.status().status === "waiting";
};

<!-- helper func -->
function elementValueById(id) {
    var element = document.getElementById(id);
    if (!element)
      return null;
    else
      return element.value;
};


