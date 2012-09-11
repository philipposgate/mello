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
    
    "click .logoutBtn": function(){
        Meteor.logout();
        Session.set("showLogin", "false");
    },
    
    "click #newAcctBtn": function(){
        Session.set("createAcctModal_ERROR", null);
        $("#createAcctForm").each(function(){this.reset()});
        $("#createAcctModal").modal("show");
    }    
});

Template.createAcctModal.events({
    "focus input": function(){
        Session.set("createAcctModal_ERROR", null);
    },
    
    "click .createAcctBtn": function(){
        var loginOpts = {
            username: elementValueById('createAcct-username'),
            password: elementValueById('createAcct-password')
        };

        if (loginOpts.password != elementValueById('createAcct-confirmPassword')) {
            Session.set("createAcctModal_ERROR", "Passwords don't match");
        }
        else
        {
            try {
                Meteor.createUser(loginOpts, {}, function (error) {
                    console.log(error);
                    if (error) {
                        Session.set("createAcctModal_ERROR", error.reason || "Unknown error");
                    }
                    else
                    {
                        console.log(Meteor.user());
                        $("#createAcctModal").modal("hide");
                        onLogin();
                    }
                });
            } catch (e) {
                Session.set("createAcctModal_ERROR", e);                
            }
        }     
    }   
});

Template.createAcctMessages.errorMessage = function(){
    return Session.get("createAcctModal_ERROR");
};


