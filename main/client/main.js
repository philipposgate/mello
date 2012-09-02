var appRouter;
var home = "home";
var homeLoggedIn = "projects";

$(document).ready(function() {

    // Backbone Router Definition: AppRouter
    var AppRouter = Backbone.Router.extend({
        routes: {
            "p/:template": "mainContentRoute"    // eg: /p/myTemplate
        },
        
        mainContentRoute: function(template) {
        
            if (template == home && Meteor.user())
            {
                template = homeLoggedIn;
            }
            
            // Change "mainContent"
            Session.set("mainContent", template);
        },
        
        loadMainContent: function(template) {
	        this.navigate("/p/" + template, {trigger: true});
        }
        
    });

    // Instantiate AppRouter
    appRouter = new AppRouter;
    
    // Startup Backbone History Engine
	Backbone.history.start({pushState: true});
	
	// Set Default Page
    if (!Session.get("mainContent"))
    {
        appRouter.loadMainContent(home);
    }
    
    // This chunk doesn't seem to work because loading the 
    // 'mainContent' area seems to reload the whole page!
    $(".navLink", ".nav").click(function(){
        $(".navLink").removeClass("active");
        $(this).addClass("active");
    });
});

Meteor.startup(function() {
               
    console.log("startup: " + new Date);
    
    // Set "mainContent"
    // NOTE: this technique seems to reload the whole 
    // page when the content changes here.  Need to 
    // find a better way!
	$("div#mainContent").html(getMainContent());

});

function getMainContent() {
	return Meteor.ui.render(function() {

        var t = Session.get("mainContent");

		if (Meteor.status().connected && Meteor.status().status === "connected")
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
}

function onLogin()
{
    appRouter.loadMainContent(homeLoggedIn);
}

function onLogout()
{
    appRouter.loadMainContent(home);
}

Template.notConnected.waiting = function() {
	return Meteor.status().status === "waiting";
};



