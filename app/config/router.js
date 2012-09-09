if(Meteor.is_client)
{
	$(document).ready(function(){
		
		var Router = Backbone.Router.extend({
			routes: {
				"*actions" : "defaultRoute"
			},
			defaultRoute: function(actions){
				if(!actions) {
					$('body').html(Template.home());
				} else {
					$('body').html(Template[actions]());
				}
			}
		});

		var router = new Router;
		Backbone.history.start();
		
	});
}
