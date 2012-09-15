Template.disconnectedModal.rendered = function() {
    var status = Meteor.status(); 

    if (status.status === "waiting" && status.retry_count > 1 && $("#disconnectedModal").is(":hidden"))
    {
        $("#disconnectedModal").modal("show");  
    }
    else if (status.retry_count == 0 && $("#disconnectedModal").is(":visible"))
    {
        $("#disconnectedModal").modal("hide");  
    }
    
    if (status.status === "waiting")
        $(".retryBtn").removeAttr("disabled");

};

Template.disconnectedModal.events({
    "click .retryBtn": function() {
        $(".retryBtn").attr("disabled", "disabled");
        Meteor.reconnect();
    }
});

Template.disconnectedModalStatus.statusMsg = function() {
        return Meteor.status().status;
};

