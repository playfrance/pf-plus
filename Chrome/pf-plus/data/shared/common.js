function applyPfPlus(values) {
	// Changement du logo
	if (values.displayNewLogo) {
		$('a.logo').css({
			"background-image": "url(" + values.sharedPath + "img/logo.png)",
			"width": "210px",
			"left": "10px"
		});
	}
	
	// Changement du thème
	if (values.displayUniqueTheme) {
		var $link1 = $('<link type="text/css" rel="stylesheet" href="' + values.themes[values.selectedUniqueTheme].style + '" />');
		var $link2 = $('<link type="text/css" rel="stylesheet" href="' + values.themes[values.selectedUniqueTheme].forum + '" />');
		var $link3 = $('<link type="text/css" rel="stylesheet" href="' + values.themes[values.selectedUniqueTheme].base + '" />');
		$(document.head).append($link1).append($link2).append($link3);
		$(".bg-holder").css("background", "").attr("class", "level-1");
	}

	// Désactivation des signatures
	if (values.removeSignatures) {
		$(".signature").remove();
	}
	
	// Redimensionnement des images
	if (values.fixMaxWidthImg) {
		$(".messagetable").css({
			"table-layout": "fixed"
		});

		$(".messCase2 img").css({
			"max-width": "100%",
			"width": "auto",
			"height": "auto"
		});
	}
	
	// Ajout du bouton Haut de page
	if (values.addTopButtons) {
		$(".messCase2 .toolbar").each(function(index) {
			var $this = $(this).css({
				"overflow": "hidden"
			});
			$this.append('<div class="right"><a href="#haut" style="color:rgb(43, 104, 169); font-weight: bold;">Haut de page</a></div>');
			$this.children(".spacer").remove();
		});
	}
	
	// Ajout du clic droit pour quoter un message
	if (values.fastQuote /* || Autres contextMenu */) {
		// Code générique ContextMenu
		$('body').append('<div class="pf-plus-context-menu"></div>');
		var $context = $('.pf-plus-context-menu');
		
		// Spécifique FastQuote
		if (values.fastQuote && $('.messCase2:first').length > 0) {
			var $textarea = $("textarea.reponserapide");			
			if ($textarea.length) {
				$(document).on("click", function() {
					$context.html("").hide();
				}).on("contextmenu", function(documentEvent) {
					$context.html("").hide();
					
					var selection = document.getSelection();
					var text = selection.toString();
					var isInComment = $(selection.anchorNode.parentNode).parents('.messCase2').length > 0;
					
					if (text.length && isInComment) {
							$context.html(
								$('<a href="#">').html("Citer le texte s&eacute;lectionn&eacute;").on("click", function(linkEvent) {
									$textarea.trigger("focus").append('[quote]' + text + '[/quote]');
									window.scrollTo(0, $textarea.offset().top);
									$context.hide();
									return false;
								}
							)).on("show", function(ev, oEv){
								var $element = $(this);
								$element.show().css({
									"left": "0px",
									"right": ""
								});
								
								$element.css({
									"top": (oEv.pageY + 10) + "px",
									"left": (oEv.pageX + 10) + "px"
								});
								
								var w = $element.outerWidth();
								if (oEv.pageX + 20 + w > window.innerWidth) {
									$element.css({
										"right": "10px",
										"left": ""
									});
								}
							}).trigger("show", documentEvent);
							return false;
					}
				});
			}
		}
	}
	
	// Chargement des vidéos
	// Youtube
	if (values.displayYoutube) {
		$("a[href*='youtu.be'], a[href*='youtube.com']").each(function(index) {
			var $a = $(this);
			
			var idVideo = null;
			if ($a.attr('uri:domain') == 'youtube.com') {
				idVideo = URI.parseQuery($a.attr('uri:query')).v;
			} else {
				idVideo = $a.attr('uri:filename');
			}
			
			if (idVideo) {
				$a.replaceWith('<iframe width="560" height="315" src="//www.youtube.com/embed/' + idVideo + '" frameborder="0" allowfullscreen></iframe>');
			}
		});
	}
		
	// Dailymotion
	if (values.displayDailymotion) {
		$("a[href*='dai.ly'], a[href*='dailymotion.com/video/']").each(function(index) {
			var $a = $(this);
			
			var idVideo = $a.attr('uri:filename').split('_')[0];
			
			if (idVideo) {
				$a.replaceWith('<iframe frameborder="0" width="480" height="270" src="http://www.dailymotion.com/embed/video/' + idVideo + '" allowfullscreen></iframe>');
			}
		});
	}
	
	// Chargement des tweets
	if (values.displayTwitter) {
		$("a[href*='twitter.com']").each(function( listIndex ) {
			var $tweet = $(this);
			var href = $tweet.attr('href');
			
			if (href.indexOf('status') > 0) {// Lien au format classique https://twitter.com/jack/status/20
				$tweet.replaceWith('<iframe border=0 frameborder=0 height=250 width=550 src="https://twitframe.com/show?url=' + href + '"></iframe><br />');
				return;
			}
		});

		/* find all iframes with ids starting with "tweet_" */
		$("iframe[id^='tweet_']").load(function() {
			this.contentWindow.postMessage({ element: this.id, query: "height" }, "https://twitframe.com");
		});

		/* listen for the return message once the tweet has been loaded */
		$(window).bind("message", function(e) {
			var oe = e.originalEvent;
			if (oe.origin != "https://twitframe.com") {
				return;
			}
			
			if (oe.data.height && oe.data.element.match(/^tweet_/)) {
				$("#" + oe.data.element).css("height", parseInt(oe.data.height) + "px");
			}
		});
	}
	
	// Chargement des images
	if (values.lazyLoadingOnImg) {
		$("img:not(img[src^='/static/'])").each(function(index) {
			var $img = $(this);
			var src = $img.attr('src');
			$img.attr("class", "lazy").attr("data-original", src).attr("src", values.sharedPath + "img/spacer.gif");
		});
		
		$(".lazy").lazyload({
			threshold : 200,
			effect: "fadeIn"
		});
	}
	
	if (true) {
		$(".reponserapide").addClass('pf-plus-reponserapide').focus(function() {
			$("#content_form").animate({
				height: "+=100"
			}, 500, function() {
				 // Animation complete
			});
		}).focusout(function() {
			$("#content_form").animate({
				height: "-=100"
			}, 500, function() {
				 // Animation complete
			});
		});
	}
}