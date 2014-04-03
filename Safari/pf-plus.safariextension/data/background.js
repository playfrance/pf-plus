/**
* Background JS for getting fav
*/
var site = new Site('PlayFrance', "forum.playfrance.com", "pf.inc", 120000, '');
var timeout = null;

function updateBadge(nbUnread) {
	safari.extension.toolbarItems.forEach(function(item) {
		// Pour changer le tooltip - item.toolTip
		if (nbUnread && nbUnread != null && parseInt(nbUnread) != NaN && parseInt(nbUnread) > 0) {
			item.badge = nbUnread;
		} else if (nbUnread != null && parseInt(nbUnread) == 0){
			item.badge = "";
		} else if (nbUnread != null && nbUnread.length > 0){
			item.badge = nbUnread;
		} else {
			item.badge = "...";
		}
	});
}

function refresh(onSuccess, onError) {
	site.loadFavsContent(
		function(categories, countTopics, countMps, isConnected) {
			updateBadge(countTopics);

			if (onSuccess) {
				onSuccess(categories, countTopics, countMps, isConnected);
			}
			
			clearTimeout(timeout);
			timeout = setTimeout(refresh, site.minRefreshTime);
		},
		function () {
			if (onError) {
				onError();
			}
		}
	);
}

function refreshAfterTimeout(timeout) {
	setTimeout(refresh, timeout);
}

// Function to perform when event is received
function performCommand(event) {
	// Make sure event comes from the button
	if (event.command == "open-popover") {
		// Open popover
		showPopover("popup", "pf-plus");
	}
}

function showPopover(popoverId, toolbarItemId) {
    var toolbarItem = safari.extension.toolbarItems.filter(function (tbi) {
        return tbi.identifier == toolbarItemId && tbi.browserWindow == safari.application.activeBrowserWindow;
    })[0];
    var popover = safari.extension.popovers.filter(function (po) {
        return po.identifier == popoverId;
    })[0];
	
	// On met la popover sur la toolbar
    toolbarItem.popover = popover;
	
	// On refresh d'abord le contenu
	popover.contentWindow.location.reload();
	
	// On affiche la popover
    toolbarItem.showPopover();  
}

refresh();

/**
* Background JS for getting options
*/
function getStorage(msgEvent) {
    if (msgEvent.name == "getStorage") {
		var values = {
			// Chemins de l'extension
			"dataPath": safari.extension.baseURI + "data/",
			"sharedPath": safari.extension.baseURI + "data/shared/",
			
			// Options de l'extension
			"displayNewLogo": safari.extension.settings.getItem('displayNewLogo'),
			"displayUniqueTheme": safari.extension.settings.getItem('displayUniqueTheme'),
			"selectedUniqueTheme": safari.extension.settings.getItem('selectedUniqueTheme'),
			"removeSignatures": safari.extension.settings.getItem('removeSignatures'),
			"fixMaxWidthImg": safari.extension.settings.getItem('fixMaxWidthImg'),
			"addTopButtons": safari.extension.settings.getItem('addTopButtons'),
			"fastQuote": safari.extension.settings.getItem('fastQuote'),
			"displayYoutube": safari.extension.settings.getItem('displayYoutube'),
			"displayDailymotion": safari.extension.settings.getItem('displayDailymotion'),
			"displayTwitter": safari.extension.settings.getItem('displayTwitter'),
			"lazyLoadingOnImg": safari.extension.settings.getItem('lazyLoadingOnImg'),
			"betterqQuickResponse": safari.extension.settings.getItem('betterqQuickResponse'),
			"displayMyPosts": safari.extension.settings.getItem('displayMyPosts'),
			"refreshAutoTopic": safari.extension.settings.getItem('refreshAutoTopic'),
			"selectedIntervalRefreshAutoTopic": safari.extension.settings.getItem('selectedIntervalRefreshAutoTopic'),
			
			// Styles par constructeur
			"themes": {
				"sony": {
					"forum": "/css/forum_pf.css",
					"base":  "/css/base_color_pf.css",
					"style": "/include/the_style1.php?color_key=FFFFFF/f9f9f9/000080/92c5c5/307099/FFFFFF/FFFFFF/000000/000000/000000/2b68a9/FFFFFF/F8F8F8/FFFFFF/F8F8F8/f1e9e9/FFFFFF/F8F8F8/000000/000000/0000FF/EEEEFF/DDDDEE/000000/FFEEEE/000000/FFFFFF/FF0000/FFFFFF/0/0/static/NULL/&abs_img_path=%40data%40www%40vhosts%40httpdocs%40www%40static%40&hide_bg_onglet=0&v=11102781422"
				},
				"microsoft": {
					"forum": "/css/forum_xf.css",
					"base":  "/css/base_color_xf.css",
					"style": "/include/the_style1.php?color_key=FFFFFF/f9f9f9/000080/92c5c5/CCCCCC/FFFFFF/FFFFFF/000000/000000/000000/000066/FFFFFF/F8F8F8/FFFFFF/F8F8F8/f1e9e9/FFFFFF/F8F8F8/000000/000000/0000FF/EEEEFF/DDDDEE/000000/FFEEEE/000000/FFFFFF/FF0000/FFFFFF/0/0/static/NULL/&abs_img_path=%40data%40www%40vhosts%40httpdocs%40www%40static%40&hide_bg_onglet=0&v=11102781422"
				},
				"nintendo": {
					"forum": "/css/forum_wf.css",
					"base":  "/css/base_color_wf.css",
					"style": "/include/the_style1.php?color_key=FFFFFF/F0F0F0/000080/C2C3F4/D5E6E1/000080/000080/000000/000080/000000/000066/F7F7F7/DEDFDF/F7F7F7/DEDFDF/C0C0C0/FFFFFF/FFFFFF/000000/000000/0000FF/EEEEFF/DDDDEE/000000/FFEEEE/000000/FFFFFF/FF0000/FFFFFF/0/0/static/NULL/&abs_img_path=%40data%40www%40vhosts%40httpdocs%40www%40static%40&hide_bg_onglet=0&v=11102781422"
				},
				"pc": {
					"forum": "/css/forum_pca.css",
					"base":  "/css/base_color_pca.css",
					"style": "/include/the_style1.php?color_key=FFFFFF/F0F0F0/000080/C2C3F4/D5E6E1/000080/000080/000000/000080/000000/000066/F7F7F7/DEDFDF/F7F7F7/DEDFDF/C0C0C0/FFFFFF/FFFFFF/000000/000000/0000FF/EEEEFF/DDDDEE/000000/FFEEEE/000000/FFFFFF/FF0000/FFFFFF/0/0/static/NULL/&abs_img_path=%40data%40www%40vhosts%40httpdocs%40www%40static%40&hide_bg_onglet=0&v=11102781422"
				}
			}
		};
		
		msgEvent.target.page.dispatchMessage("getStorageResult", values);
	}
}

safari.application.addEventListener("message", getStorage, false);
safari.application.addEventListener("command", performCommand, false);