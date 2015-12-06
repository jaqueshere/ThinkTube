$(document).ready(function() {
	$('#searchbox').keypress(function(e) {
		if (e.keyCode == 13) {
			e.preventDefault();
			var movie = $('#query').val();
			$('#search-results').empty();
			getResults(movie);
			$('#query').val('');
		}
	});
	
	$('.submit-button').click(function(e) {
		e.preventDefault();
		var movie = $('#query').val();
		$('#search-results').empty();
		getResults(movie);
		$('#query').val('');
	});

});

function getResults(searchTerm) {
	parameters = {
		part: 'snippet',
		key: 'AIzaSyD6TgEzndp-ttRk_7RVUdZaSrJR3BEoFiE',
		q: searchTerm
	}
	var url = 'https://www.googleapis.com/youtube/v3/search';
	var results = $.getJSON(url, parameters).done(function() {
		$.each(results.responseJSON.items, function(index, newarray) {
			showResults(newarray)
		});
	});
}

function showResults(results) {
	console.log(results.id.videoId);
	var link = '<a href="https://www.youtube.com/watch?v=' + results.id.videoId + '">';
	$('#search-results').append('<p>' + link + '<img style="width: 95%" src="' + results.snippet.thumbnails.high.url + '"></a></p>');
}