Template.violet.events = {
	'click .collection a' : function(e){
		e.preventDefault();
		getCollectionInfo($(e.target).attr('data-cn'));
	}
}

Template.violet.created = getCollectionNames;

Template.documents.prettyPrint = function(object, key) {
	var o = $('<div class="vio-object">');
	$(o).append($('<div>' + (key != "null" ? key+": ":"") + '{</div>'));
	
	_.each(object, function(value, key) {
		if(_.isObject(value)) {
			$(o).append((Template.documents.prettyPrint(value, key)).string);
		} else {
			var keyVal = $('<div class="vio-kv">').html(key + ' : "' + object[key] + '"');
			$(o).append(keyVal);
		}
	})
	
	$(o).append($('<div>}</div>'));
	return new Handlebars.SafeString("<div class='vio-obj'>" + $(o).html() + "</div>");
}

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
				Template.documents.list.push(value);
			})
			
			$('.documentList').html(Template.documents());
		}
	})
}