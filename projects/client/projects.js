// Define Minimongo collections to match server/publish.js.
Projects = new Meteor.Collection("projects");

// ID of currently selected project
Session.set('project_id', null);

// Subscribe to 'projects' collection on startup.
Meteor.subscribe('projects', function () {
	// Select a project once data has arrived.
	//  if (!Session.get('project_id')) {
	//    var project = Projects.findOne({}, {sort: {name: 1}});
	//    if (project)
	//      ProjectRouter.setProject(project._id);
	//  }
});

Template.projects.loginRequired = true;

Template.projects.projects = function () {
  return Projects.find({}, {sort: {name: 1}});
};

Template.projects.events = {
  'click .callFoo' : function() {
	Meteor.call("foo", function(error, result) {
		console.log("\n" + new Date());
		console.log(error);
		console.log(result);
		console.log(Meteor.user());
	 	});
        }
};

var ProjectRouterProto = Backbone.Router.extend({
  routes: {
    ":project_id": "main"
  },
  main: function (project_id) {
    Session.set("project_id", project_id);

  },
  setProject: function (project_id) {
    this.navigate(project_id, true);
  }
});

ProjectRouter = new ProjectRouterProto;
