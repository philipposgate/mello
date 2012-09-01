var appRouter;

$(document).ready(function(){
    var AppRouter = Backbone.Router.extend({
        routes: {
            "p/:template": "page"    // /p/fooTemplate
        },
        page: function(template) {
            if (template == "home" && Meteor.user())
            {
                template = "projects";
            }
            Session.set("mainTemplate", template);
        }
    });

    appRouter = new AppRouter;
    
	Backbone.history.start({pushState: true});
	
    if (!Session.get("mainTemplate"))
    {
	    appRouter.navigate("/p/home", {trigger: true});	    
    }
});

Meteor.startup(function(){
                
	var mainContent = Meteor.ui.render(function() {

        var t = Session.get("mainTemplate");

		if (isConnected())
		{
		    if (Template[t])
		    {
		        if (Template[t].loginRequired && !Meteor.user())
		        {
				    t = "notLoggedIn";
				}		       
		    }
		    else
		    {
				t = "pageNotFound";
		    }
		}
		else
		{
		    t = "notConnected";
		}

   		return Template[t]();
	});
	
	$("div#mainContent").html(mainContent);

});

function onLogin()
{
	//console.log("onLogin(): " + new Date());
	appRouter.navigate("/p/projects", {trigger: true});
}

function onLogout()
{
	//console.log("onLogout(): " + new Date());
	appRouter.navigate("/p/home", {trigger: true});
}

function isConnected() {
      	return Meteor.status().connected && Meteor.status().status === "connected";
};

Template.notConnected.waiting = function() {
	return Meteor.status().status === "waiting";
};



