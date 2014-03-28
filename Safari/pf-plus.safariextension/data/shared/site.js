function Site (name, hostAndBase, config, minRefreshTime, fragment) {
	this.name = name;
	this.hostAndBase = hostAndBase;
	this.config = config;
	this.minRefreshTime = minRefreshTime;
	this.fragment = fragment;
	
	this.unreadRex = /title="Sujet n.\d+">([^<]+).+sujetCase5"><a href="([^"]+).+Aller au dernier message lu sur ce sujet \(p.(\d+)\)/g;
	this.entryUrlRex = /cat=(\d+)&amp;(subcat=(\d+)&amp;)?post=(\d+)&amp;page=(\d+)/;
	this.mpRex = /class="red">Vous avez (\d*) nouveau/;
	this.catsFavRex = /<a href="([^#].*&amp;cat=(\d+)[^"]+)" class="cHeader">([^<]+)/g;
	this.notConnectedRex = /Aucun sujet que vous avez lu n'est connu/;
	
	this.categories = new Array();
	this.countTopics = 0;
	this.countMps = 0;
	this.isConnected = false;
	
	Site.prototype.applyXtor = function(url) {
		var uriParts = url.split('?');
		var uri = uriParts[0];
		var request = '';

		if (uriParts.length > 1) {
			request += uriParts[1];
		}
		
		if (this.fragment != null && this.fragment != '') {
			if (request != '') {
				request += "&";
			}
		
			request += this.fragment;
		}
		
		if (request != '') {
			request = "?" + request;
		}
		
		return uri + request;
	};
	Site.prototype.getBaseUrl = function() {
		return "/forum1f.php?config=" + this.config;
	};
	Site.prototype.getOwnUrl = function(own) {
		if (own == null) {
			own = '';
		}
	
		return this.getBaseUrl() + "&owntopic=" + own;
	};
	Site.prototype.getFavsUrl = function() {
		return this.getFullUrl(this.getOwnUrl(3));
	};
	Site.prototype.getMpsUrl = function() {
		return this.getFullUrl("/forum1.php?config=" + this.config + "&cat=prive");
	};
	Site.prototype.getFullUrl = function(uri) {
		if (uri == null) {
			uri = '';
		}
	
		return this.applyXtor("http://" + this.hostAndBase + uri);
	};
	Site.prototype.loadFavsContent = function(onSuccess, onError) {
		var site = this;
		
		// Url à sniper
		$.ajax({
			type: "GET",
			url: site.getFavsUrl(),
			//data: 'owntopic=3',
			contentType: "text/html; charset=utf-8",
			dataType: "html",
			success: function (data, status) {
				// Vérification de la connexion
				site.isConnected = false;
				site.categories = new Array();
				site.countTopics = 0;
				site.countMps = 0;
				
				if (site.notConnectedRex.exec(data) == null) {
					site.isConnected = true;
					
					// Récupération du nombre de nouveaux messages privés
					site.countMps = site.parseCountMps(data);
					
					// Récupération des catégories
					site.categories = site.parseCatsFav(data);
					
					// Récupération des topics non lus
					var tmpTopics = site.parseUnread(data);
					
					// Assignation des topics aux catégories
					$.each(site.categories, function(indexCategory, category) {
						$.each(tmpTopics, function(indexTopic, topic) {
							if (topic.idCategory == category.id) {
								category.topics.push(topic);
							}
						});
						
						site.countTopics += category.topics.length;
					});
				}
				
				if (onSuccess) {
					onSuccess(site.categories, site.countTopics, site.countMps, site.isConnected);
				}
			},
			failure: function (data) {
				if (onError) {
					onError();
				}
			},
			error: function (data) {
				if (onError) {
					onError();
				}
			}
		});
	}
	Site.prototype.parseCatsFav = function(content) {
		var matches = null;
		var cats = new Array();
		
		while (matches = this.catsFavRex.exec(content)) {
			// Récupération de l'Id Cat de son libellé et de son url
			cats.push({ id: matches[2], label: matches[3], url: matches[1], topics: Array() });
		}
		
		return cats;
	};
	Site.prototype.parseUnread = function(content, muted, popupContent) {
		var matches = null;
		var unreads = new Array();
		
		// Récupération du select des catégories
		while (matches = this.unreadRex.exec(content)) {
			var urlMatch = this.entryUrlRex.exec(matches[2]);
			if (urlMatch != null) {
				// Récupération du libellé du topic de son url et de son id Cat
				unreads.push({ label: matches[1], url: matches[2], idCategory: urlMatch[1] });
			}
		}
		
		return unreads;
	};
	Site.prototype.parseCountMps = function(content) {
		var matches = null;
		var countMps = 0;
		
		matches = this.mpRex.exec(content);
		if (matches != null) {
			countMps = matches[1];
		}

		return countMps;
	};
}