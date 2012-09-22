Template.forgotPasswordModal.show = function() {
    $("form", "#forgotPasswordModal").reset();
    $("#forgotPasswordModal").modal("show");
};

Template.forgotPasswordModal.rendered = function() {
    $("#forgotPasswordModal").on("shown", function () {
      $("#recoverEmail").focus();
    });
};

Template.forgotPasswordModal.events({
    "click .recoverPasswordBtn": function() {
        Meteor.forgotPassword({email: elementValueById("#recoverEmail")}, function(error) {
            console.log(error);
        });
    }
});


