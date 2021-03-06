/********/
/* Base */
/********/
$(document).ready(function() {
	$('#openMP a').on('click', function () {
		newTab(getCommons().site.getMpsUrl());
	});
	$('#openAll a').on('click', function () {
		openAll();
	});
	$('#refresh a').on('click', function () {
		setContent();
	});
	$('#goToSite a').on('click', function () {
		newTab(getCommons().site.getFullUrl());
	});
	$('#options a').on('click', function () {
		newTab('data/options.html');
	});
	
	setContent();
});

/*************/
/* Functions */
/*************/
function setContent() {
	getCommons().refresh(
		function(categories, countTopics, countMps, isConnected) {
			$('#openMP').hide();
		
			if (isConnected) {
				$('#openAll').show();
				$('#connected').show();
				$('#disconnected').hide();
				
				// Génération du contenu
				var $contentFavs = $('#contentFavs');
				$contentFavs.html('');
				
				if(countMps > 0) {
					var hasMore = countMps > 1;
					$('#openMP a').html('Vous avez ' + countMps + ' nouveau' + (hasMore ? 'x' : '') + ' message' + (hasMore ? 's' : ''));
					$('#openMP').show();
				}
				
				if(countTopics == 0) {
					$contentFavs.append('<p>Pas de favoris</p>');
				}
				else {
					$.each(categories, function(indexCategory, category) {
						if (category.topics.length > 0) {
							var html = '<ul>';
							html += '<li class="category"><a href="' + getCommons().site.getFullUrl(category.url) + '">' + category.label + '</a></li>';
							html += '<li><ul>';
							
							$.each(category.topics, function(indexTopic, topic) {
								html += '<li class="topic"><a href="' + getCommons().site.getFullUrl(topic.url) + '">' + topic.label + '</a></li>';
							});
							
							html += '</ul></li>';
							html += '</ul>';
							
							$contentFavs.append(html);
						}
					});
					
					// Assignation des clicks
					$contentFavs.find('a').on('click', function () {
						newTab($(this).attr('href'));
						getCommons().refreshAfterTimeout(4000);
						return false;
					});
				}
			}
			else {
				$('#openAll').hide();
				$('#connected').hide();
				$('#disconnected').show();
			}
		},
		function () {
			alert('Oups, une erreur est survenue.');
		}
	);
}

function openAll() {
	$('.topic a').each(function() {
		newTab($(this).attr('href'));
	});
	
	getCommons().refreshAfterTimeout(4000);
}