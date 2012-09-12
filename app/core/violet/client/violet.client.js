_.extend(Mello, {
	violet : {
		index : function() {
			$('body').html(Template.violet());
			getCollectionNames();
		}
	}
});

Template.voilet.events({
    "click .newCollectionBtn" : function() {
	    alert(1234);
    }
});

$(document).ready(function(){
	$('.collection a').live('click', function(e){
		e.preventDefault();
		getCollectionInfo($(this).attr('data-cn'));
	})
})

function getCollectionNames() {
	Meteor.call('getCollectionNames', function(error, result) {
		if (typeof error === "undefined") {
			Template.collections.list = result;
			$('.collectionList').html(Template.collections());
		}
	})
}

function getCollectionInfo(collection) {
	Meteor.call('getCollectionInfo', collection, function(error, result) {
		if (typeof error === "undefined") {			
			Template.documents.list = [];
			_.each(result, function(value) {
				Template.documents.list.push(JSON.stringify(value));
			})
			
			$('.documentList').html(Template.documents());
		}
	})
}
