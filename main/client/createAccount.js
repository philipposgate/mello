Template.createAcctModal.show = function() {
    $("form", "#createAcctModal").reset();
    $("#createAcctModal").modal("show");
};

Template.createAcctModal.rendered = function() {
    $("#createAcctModal").on("shown", function () {
      $("#createAcct-email").focus();
    });
};

Template.createAcctModal.events({
    "focus input": function(){
        Session.set("createAcctModal_ERROR", null);
    },
    
    "click .createAcctBtn": function(){
        var acct = {
            email: elementValueById('createAcct-email'),
            username: elementValueById('createAcct-username'),
            password: elementValueById('createAcct-password')
        };

        if (acct.password != elementValueById('createAcct-confirmPassword')) {
            Session.set("createAcctModal_ERROR", "Passwords don't match");
        }
        else
        {
            try {
                Meteor.createUser(acct, {}, function (error) {
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


