Meteor.startup(function() {
  var canModify = function(userId, tasks) {
    return _.all(tasks, function(task) {
      return !task.privateTo || task.privateTo === userId;
    });
  };

  Todos.allow({
    insert: function () { return true; },
    update: canModify,
    remove: canModify,
    fetch: ['privateTo']
  });

  Cards.allow({
    insert: function () { return true; },
    update: function () { return true; },
    remove: function () { return true; }
  });

  Lists.allow({
    insert: function () { return true; },
    update: function () { return true; },
    remove: function () { return true; }
  });
});
