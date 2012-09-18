Template.violet.events = {
	'click .collection a' : function(e){
		e.preventDefault();
		getCollectionInfo($(e.target).attr('data-cn'));
	}
}

Template.violet.created = getCollectionNames;

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