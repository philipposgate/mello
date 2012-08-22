Meteor.methods({
    foo: function() {
    	console.log("userID:" + this.userId());
      return {foo: "bar"};
    }

  });