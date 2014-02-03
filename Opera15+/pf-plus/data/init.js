chrome.runtime.sendMessage({method: "getStorage", key: "all"}, function(response) {
	var $link = $('<link type="text/css" rel="stylesheet" href="' + response.data.sharedPath + 'css/styles.css" />');
	$(document.head).append($link);

	applyPfPlus(response.data);
});