function getCommons() {
	return chrome.extension.getBackgroundPage();
}

function newTab(url) {
	var win = Components.classes['@mozilla.org/appshell/window-mediator;1']
                  .getService(Components.interfaces.nsIWindowMediator)
                  .getMostRecentWindow('navigator:browser');
	win.gBrowser.selectedTab = win.gBrowser.addTab(url);
}