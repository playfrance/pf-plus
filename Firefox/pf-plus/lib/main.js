/**
* PF + Addon Initialisation
*/

var pageMod = require("sdk/page-mod");
var simplePrefs = require("sdk/simple-prefs");
var data = require("sdk/self").data;

pageMod.PageMod({
    include: [
		"http://forum.pcactu.com*",
		"http://forum.playfrance.com*",
		"http://forum.wiidsfrance.com*",
		"http://forum.xboxfrance.com*"
	],
	contentStyleFile: [
		data.url("shared/css/styles.css")
	],
	contentScriptWhen: 'ready',
    contentScriptFile: [
		data.url("shared/scripts/jquery-2.1.0.min.js"),
		data.url("shared/scripts/URI-1.12.0.min.js"),
		data.url("shared/scripts/jquery.URI-1.12.0.min.js"),
		data.url("shared/scripts/jquery.lazyload-1.9.3.min.js"),
		data.url("shared/scripts/lazyYT.min.js"),
        data.url("shared/common.js"),
        data.url("init.js")
    ],
    onAttach: function (worker) {
        worker.port.on("getStorage", function() {
			var values = {
				// Chemins de l'extension
				"dataPath": data.url(""),
				"sharedPath": data.url("") + "shared/",
				
				// Options de l'extension
				"displayNewLogo": simplePrefs.prefs.displayNewLogo,
				"displayUniqueTheme": simplePrefs.prefs.displayUniqueTheme,
				"selectedUniqueTheme": simplePrefs.prefs.selectedUniqueTheme,
				"removeSignatures": simplePrefs.prefs.removeSignatures,
				"fixMaxWidthImg": simplePrefs.prefs.fixMaxWidthImg,
				"addTopButtons": simplePrefs.prefs.addTopButtons,
				"fastQuote": simplePrefs.prefs.fastQuote,
				"displayYoutube": simplePrefs.prefs.displayYoutube,
				"displayDailymotion": simplePrefs.prefs.displayDailymotion,
				"displayTwitter": simplePrefs.prefs.displayTwitter,
				"lazyLoadingOnImg": simplePrefs.prefs.lazyLoadingOnImg,
				"betterqQuickResponse": simplePrefs.prefs.betterqQuickResponse,
				"displayMyPosts": simplePrefs.prefs.displayMyPosts,
				"refreshAutoTopic": simplePrefs.prefs.refreshAutoTopic,
				"selectedIntervalRefreshAutoTopic": simplePrefs.prefs.selectedIntervalRefreshAutoTopic,
				
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
			
            worker.port.emit("getStorage", values);
        });
    }
});