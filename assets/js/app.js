var time_input = 0;
var suggested_articles = [];

var reddit_json;
var reddit_endpoint = 'http://cors-enabler.herokuapp.com/http://reddit.com/r/';

var newspaper_json;
document.getElementById('time_input').addEventListener('keypress', function (event) {
	if(event.keyCode !== 13)
		return

	time_input = document.getElementById('time_input').value;
	
	$.getJSON(reddit_endpoint + document.getElementById('option_picker').value + '.json', function (data) {
		reddit_json = data.data.children;
		for (var i = reddit_json.length - 1; i >= 0; i--) {
			$.getJSON('/scrape?url_to_scrape=http://newspaper-demo.herokuapp.com/articles/show?url_to_clean=' + reddit_json[i].data.url, function (scraped_data) {
				suggested_articles.push(scraped_data);
				console.log(scraped_data);
			});
		};
		displayArticles(suggested_articles);
	});
});

document.getElementById('option_picker').addEventListener('change', function (event) {
	time_input = document.getElementById('time_input').value;

	$.getJSON(eval(document.getElementById('option_picker').value), function (data) {
		
	});
});

function displayArticles (articles) {
	document.getElementById('articles').innerHTML = '';
	for (var i = 0; i < articles.length; i++) {
		var title = articles[i].title;
		var article_link = articles[i].url;

		var article_link_elem = document.createElement('a');
		article_link_elem.href = article_link;
		article_link_elem.setAttribute('target', '_blank');

		var title_elem = document.createElement('span');
		title_elem.innerHTML = title;

		article_link_elem.appendChild(title_elem);

		var row = document.createElement('div');
		row.className = 'row';
		row.appendChild(article_link_elem);

		document.getElementById('articles').appendChild(row);
	};
	suggested_articles = [];
}