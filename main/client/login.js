Template.loginModal.show = function() {
    Session.set("loginModal_ERROR", null);
    $("form", "#loginModal").reset();
    $("#loginModal").modal("show");
};

Template.loginModal.rendered = function() {
    $("#loginModal").on("shown", function () {
      $("#loginUsername").focus();
    });
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
    },
    
    "click .forgotPasswordBtn": function() {
        $("#loginModal").modal("hide");
        Template.forgotPasswordModal.show();
    }
    
});

Template.loginMessages.errorMessage = function(){
    return Session.get("loginModal_ERROR");
};

