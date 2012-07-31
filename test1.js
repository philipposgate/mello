Stuff = new Meteor.Collection("stuff");


if (Meteor.is_client) {
  Template.statusBar.connected = function() {return Meteor.status().connected;};
  Template.statusBar.status = function() {return Meteor.status().status;};

  Template.stuffList.stuffs = function(){
      var s = Stuff.find({}, {sort: {key: 1}});
      //console.log(s);
      return s;
  };


  Template.stuffList.events = {
    'click .addStuff' : function (evt) {
      console.log($(".stuffKey").val());
      console.log($(".stuffValue").val());
      Stuff.insert({
        key: $(".stuffKey").val(),
        value: $(".stuffValue").val()
      });      
      $(".stuffKey").val("");
      $(".stuffValue").val("");
      $(".stuffKey").focus();
    }
  };
}

if (Meteor.is_server) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}