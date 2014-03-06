function getCommons() {
	return chrome.extension.getBackgroundPage();
}

function newTab(url) {
	chrome.tabs.getAllInWindow(undefined, function(tabs){
		chrome.tabs.create({url: url});
	});
}