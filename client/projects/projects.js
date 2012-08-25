// Define Minimongo collections to match server/publish.js.
Projects = new Meteor.Collection("projects");

// ID of currently selected project
Session.set('project_id', null);

// Subscribe to 'projects' collection on startup.
// Select a project once data has arrived.
Meteor.subscribe('projects', function () {
//  if (!Session.get('project_id')) {
//    var project = Projects.findOne({}, {sort: {name: 1}});
//    if (project)
//      ProjectRouter.setProject(project._id);
//  }
});

Template.projects.projects = function () {
  return Projects.find({}, {sort: {name: 1}});
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