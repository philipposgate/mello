Template.navbar.events({
   
    "click .logoutBtn": function(){
        Meteor.logout();
        Session.set("showLogin", "false");
        onLogout();
    },

});


