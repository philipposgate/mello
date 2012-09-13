Template.loginModal.open = function() {
    Session.set("loginModal_ERROR", null);
    $("#loginModal").modal("show");
};

Template.loginModal.events({
    "focus input": function() {
        Session.set("loginModal_ERROR", null);
    },
   
    "click .loginBtn": function() {
        var username = $("#loginUsername").val();
        var password = $("#loginPassword").val();
        Meteor.loginWithPassword(username, password, function(error, result) {
          if (error) {
             Session.set("loginModal_ERROR", "Login Failed");
          }
          else
          {
             $("#loginModal").modal("hide");
             onLogin();
          }
        });
    }
    
});

Template.loginMessages.errorMessage = function(){
    return Session.get("loginModal_ERROR");
};

