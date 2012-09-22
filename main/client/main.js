var Router = Backbone.Router.extend({
	routes: {
		"*action" : "defaultRoute"
	},
	
	defaultRoute: function(action) {
	    
		if(!action)
		{
			action = "home";
		}
		else if (typeof Template[action] === "undefined") 
		{
			action = "pageNotFound";
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

    // Fire up Backbone Router
	Backbone.history.start({pushState: true});
	
	// A "reset form" jquery-function
	// Usage: $("form", "#formContainer").reset();
	$.fn.reset = function () {
        $(this).each (function() { this.reset(); });
    }
});

// Called on a login event
function onLogin()
{
    router.navigate("/home", {trigger: true});
}

// Called on a logout event
function onLogout()
{
    router.navigate("/home", {trigger: true});
}

// A global helper function for getting element 'values' by their id (without using jquery)
function elementValueById(id) {
    var element = document.getElementById(id);
    if (!element)
      return null;
    else
      return element.value;
};


