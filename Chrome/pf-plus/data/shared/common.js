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
						// Récupération de l'auteur du message cité
						var $parentRoot = $(selection.anchorNode.parentNode).parents('.message');
						var $topicParams = null;
						var queryString = null;
						var $citerLink = $parentRoot.find('a[href*="/citer-"]:first');
						if ($citerLink.length) {
							queryString = $citerLink.attr("href").split('/citer-')[1].split('.')[0].split('-');
							if (queryString[0].length && queryString[3].length) {
								$topicParams = {
									topic : queryString[0],
									refMessage: queryString[3]
								};
							}
						}
						else {
							$citerLink = $parentRoot.find('a[href*="ref="]:first');
							if ($citerLink.length) {
								queryString = URI.parseQuery($citerLink.attr('uri:query'));
								if (queryString.post && queryString.ref) {
									$topicParams = {
										topic : queryString.post,
										refMessage: queryString.ref
									};
								}
							}
						}

						var $authorId = $parentRoot.find('a[href*="/profil-"]:first').attr("href").split('/profil-')[1].split('.')[0].split('-');
						
						var $citation = '';
						if ($topicParams != null && $authorId.length) {
							var result = $topicParams.topic + ',' + $topicParams.refMessage + ',' + $authorId;
							$citation = '[quotemsg=' + result + ']' + text + '[/quotemsg]';
						}
						else {
							$citation = '[quote]' + text + '[/quote]';
						}
					
						$context.html(
							$('<a href="#">').html("Citer le texte s&eacute;lectionn&eacute;").on("click", function(linkEvent) {
								$textarea.trigger("focus").val($textarea.trigger("focus").val() + $citation);
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
	
	$('.msg-pseudo a').each(function(index) {
		var $div = $(this);
		var pseudo = $('#login_area strong').text().replace('Bienvenue ', '');
		
		if ($div.text() == pseudo) {
			$div.parents('.message').removeClass('cBackCouleurTab1 cBackCouleurTab2 cBackCouleurTabModo').addClass('pf-plus-cBackCouleurTabMy');
		}
	});
	
	$('.citation a').each(function(index) {
		var $a = $(this);
		var pseudo = $('#login_area strong').text().replace('Bienvenue ', '');
		
		if ($a.text().replace(' a écrit :', '') == pseudo) {
			$a.parents('.messCase2').find('.toolbar').after('<div class="pf-plus-pseudoinpost">Votre pseudo appara&icirc;t dans ce message</div>');
		}
	});
	
	// Chargement des vidéos
	// Youtube
	if (values.displayYoutube) {
		$("a[href*='youtu.be'], a[href*='youtube.com']").each(function(index) {
			var $a = $(this);
			if ($a.parents('.signature').length == 0) {
				var idVideo = null;
				if ($a.attr('uri:domain') == 'youtube.com') {
					idVideo = URI.parseQuery($a.attr('uri:query')).v;
				} else {
					idVideo = $a.attr('uri:filename');
				}
				
				if (idVideo) {
					$a.replaceWith('<div class="lazyYT" data-youtube-id="' + idVideo + '" data-width="560" data-height="315">chargement...</div>');
				}
			}
		});
		
		$('.lazyYT').lazyYT();
	}
		
	// Dailymotion
	if (values.displayDailymotion) {
		$("a[href*='dai.ly'], a[href*='dailymotion.com/video/']").each(function(index) {
			var $a = $(this);
			if ($a.parents('.signature').length == 0) {
				var idVideo = $a.attr('uri:filename').split('_')[0];
				
				if (idVideo) {
					$a.replaceWith('<iframe frameborder="0" width="480" height="270" src="http://www.dailymotion.com/embed/video/' + idVideo + '" allowfullscreen></iframe>');
				}
			}
		});
	}
	
	// Chargement des tweets
	if (values.displayTwitter) {
		$("a[href*='twitter.com']").each(function( listIndex ) {
			var $tweet = $(this);
			if ($tweet.parents('.signature').length == 0) {
				var href = $tweet.attr('href');
				
				if (href.indexOf('status') > 0) {// Lien au format classique https://twitter.com/jack/status/20
					$tweet.replaceWith('<iframe border=0 frameborder=0 height=250 width=550 src="https://twitframe.com/show?url=' + href + '"></iframe><br />');
					return;
				}
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
	
	if (values.betterqQuickResponse && $('.reponserapide').length > 0) {
		// Récupération du code de l'utilisateur
		var $inputHidden = $('input[name="hash_check"]:first');
		if ($inputHidden.length > 0)
		{
			// Injection du JS du commentaire
			$.getScript("/static/compressed/editPost.js?v=11102781422");
			
			// nettoyage
			$("#md_fast_search").children("b, br").remove();
			
			// Ajout de l'input pour l'aperçu
			var $newInput = $('<input type="button" accesskey="a" value="Aperçu" />').on("click", function(){
				$('#apercu').css({ display: ''});
				$('#apercu_contenu').val($("#content_form").val());
				$('#apercu_form').submit();
			});
			
			// Récupération des inputs
			var $inputs = $("#md_fast_search input").add($newInput).detach();
			
			// Récupération du textarea
			var $reponserapide = $(".reponserapide").detach();
			
			// Injection de notre interface
			$("#addComment").after('<div class="pf-plus-wrap-reponserapide"><div class="pf-plus-buttons-reponserapide"><img tag="b" title="Mettre en gras le texte. Syntaxe : [b]texte[/b]" alt="[b]" src="/static/icones/message/bold.gif" /><img tag="i" title="Mettre en italique le texte. Syntaxe : [i]texte[/i]" alt="[i]" src="/static/icones/message/italic.gif" /><img tag="u" title="Souligner le texte. Syntaxe : [u]texte[/u]" alt="[u]" src="/static/icones/message/underline.gif" /><img tag="strike" title="Barrer le texte. Syntaxe : [strike]texte[/strike]" alt="[strike]" src="/static/icones/message/strike.gif" /><img tag="spoiler" title="Masquer le texte. Syntaxe : [spoiler]texte[/spoiler]" alt="[spoiler]" src="/static/icones/message/spoiler.gif" /><img tag="fixed" title="Ecrire avec une police de taille fixe. Syntaxe : [fixed]texte[/fixed]" alt="[fixed]" src="/static/icones/message/fixe.gif" /><img tag="cpp" title="Insérer du code C/C++. Syntaxe : [cpp]texte[/cpp]" alt="[cpp]" src="/static/icones/message/c.gif" /><img tag="url" title="Insérer une URL. Syntaxe : [url]texte[/url]" alt="[url]" src="/static/icones/message/url.gif" /><img tag="email" title="Insérer une adresse email. Syntaxe : [email]email@hostname.com[/email]" alt="[email]" src="/static/icones/message/email.gif" /><img tag="img" title="Insérer une image. Syntaxe : [img]http://www.exemple.com/exemple.jpg[/img]" alt="[img]" src="/static/icones/message/image.gif" /><img tag="*" title="Insérer une puce. Syntaxe : [*]texte" alt="[*]" src="/static/icones/message/puce.gif" /></div></div>');
			$(".pf-plus-wrap-reponserapide").append($reponserapide);
			
			// Injection du JS
			$(".pf-plus-buttons-reponserapide img").on("click", function(){
				var tag = $(this).attr("tag");
				var open = '[' + tag + ']';
				var close = '';
				
				if (tag != "*") {
					close = '[/' + tag + ']';
				}
				
				TAinsert(open, close);
			});
			
			// Injection des inputs
			$(".pf-plus-wrap-reponserapide").after($("<div></div>").append($inputs));
			
			// Amélioration affichage
			$(".reponserapide").addClass('pf-plus-reponserapide');
				
			// Injection de l'aperçu
			$("#md_fast_search").append('<div id="apercu" style="display:none"><table><tr class="reponse">'+
											'<th class="repCase1">Aperçu</th>'+
											'<th class="repCase2"><iframe name="apercu_frame" id="apercu_frame" style="border:0px" src=""></iframe></th>'+
										'</tr></table></div>');
			
			var $uniqueUserCode = $inputHidden.val();					
			$("#md_fast_search").append('<form action="/apercu.php" target="apercu_frame" method="post" name="apercu_form" id="apercu_form">'+
											'<input type="hidden" name="hash_check" value="' + $uniqueUserCode + '">'+
											'<input type="hidden" name="apercu_contenu" id="apercu_contenu" value="">'+
											'<input type="hidden" name="config" value="pf.inc">'+
										'</form>');
		}
	}
}