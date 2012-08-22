Template.hello.greeting = function () {
  return "Watch the client & server consoles while you click this button: ";
};

Template.hello.events = {
  'click input' : function () {
  		Meteor.call("foo", function(error, result) {
  			console.log("\n");
  			console.log(error);
  			console.log(result);
  			console.log(Meteor.user());
		});
  }
};
