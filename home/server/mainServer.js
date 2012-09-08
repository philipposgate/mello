Meteor.methods({
    foo: function() {
    	console.log(new Date() + " - userID:" + this.userId());
      return {foo: "bar"};
    }

  });
