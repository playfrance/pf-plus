/**
* Background JS for getting options
*/

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "getStorage") {
		if(request.key == "all") {
			var values = {
				// Chemins de l'extension
				"dataPath": chrome.extension.getURL("data") + "/",
				"sharedPath": chrome.extension.getURL("data") + "/shared/",
				
				// Options de l'extension
				"displayNewLogo": localStorage.getItem('displayNewLogo') === "true" ? true : false,
				"displayUniqueTheme": localStorage.getItem('displayUniqueTheme') === "true" ? true : false,
				"selectedUniqueTheme": localStorage.getItem('selectedUniqueTheme'),
				"removeSignatures": localStorage.getItem('removeSignatures') === "true" ? true : false,
				"fixMaxWidthImg": localStorage.getItem('fixMaxWidthImg') === "true" ? true : false,
				"addTopButtons": localStorage.getItem('addTopButtons') === "true" ? true : false,
				"fastQuote": localStorage.getItem('fastQuote') === "true" ? true : false,
				"displayYoutube": localStorage.getItem('displayYoutube') === "true" ? true : false,
				"displayDailymotion": localStorage.getItem('displayDailymotion') === "true" ? true : false,
				"displayTwitter": localStorage.getItem('displayTwitter') === "true" ? true : false,
				"lazyLoadingOnImg": localStorage.getItem('lazyLoadingOnImg') === "true" ? true : false,
				"betterqQuickResponse": localStorage.getItem('betterqQuickResponse') === "true" ? true : false,
				
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
			
			sendResponse({data: values});
		}
		else {
			sendResponse({data: localStorage[request.key]});
		}
	}
    else {
		sendResponse({}); // snub them.
	}
});