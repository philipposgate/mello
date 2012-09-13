Template.createAcctModal.open = function() {
    $("#createAcctModal").modal("show");
};

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


