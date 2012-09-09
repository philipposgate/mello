// Projects -- {name: String,
//           archived: Boolean,
//           tags: [String, ...],
//           timestamp: Number}
Projects = new Meteor.Collection("projects");

// Publish visible items for requested list_id.
Meteor.publish('projects', function () {
  return Projects.find({ privateTo: {$in: [null, this.userId()]} });
});

