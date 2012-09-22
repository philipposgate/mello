Template.changePasswordModal.show = function() {
    $("#changePasswordModal").modal("show");
};

Template.changePasswordModal.rendered = function() {
};

Template.changePasswordModal.events({
    "click .changePasswordBtn": function() {
        alert("todo");
    }
});


