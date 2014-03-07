function getCommons() {
	return safari.extension.globalPage.contentWindow;
}

function newTab(url) {
	safari.application.activeBrowserWindow.openTab().url = url;
	safari.self.hide();
}