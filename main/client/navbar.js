Template.navbar.showLogin = function(){return Session.equals("showLogin", "true");};

Template.navbar.events({
    "click .showLoginBtn": function(){
        Session.set("showLogin", "true");
        $("#loginUsername").focus(); // XXX - this doesn't work!  I think it's a timing issue.
    },
    
    "click .cancelLoginBtn": function(){Session.set("showLogin", "false");},
    
    "click .loginBtn": function(){
        var username = $("#loginUsername").val();
        var password = $("#loginPassword").val();
        Meteor.loginWithPassword(username, password, function(error, result){
          if (error) {
            alert("Login Error: " + error);
          }
          else
          {
            onLogin();
          }
        });
    },
    
    "click .logoutBtn": function(){Meteor.logout();},
    
    "click .createAcctBtn": function(){
    },   
     
    "click .forgotPwdBtn": function(){
    }
});
