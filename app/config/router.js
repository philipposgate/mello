if(Meteor.is_client)
{
	$(document).ready(function(){
		
		var Router = Backbone.Router.extend({
			routes: {
				"*actions" : "defaultRouting"
			},
			defaultRouting: function(actions){
				if(!actions || typeof Mello[actions] === "undefined") {
					Mello.home.index();
				} else {
					Mello[actions].index();
				}
			}
		});

		var router = new Router;
		Backbone.history.start();
		
	});
}
