var express = require('express');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');
var request = require('request');
var cheerio = require('cheerio');
var util = require('util');
var app     = express();

app.get('/scrape', function(req, res){

  	url = 'http://cors-enabler.herokuapp.com/' + querystring.parse(req.url)["/scrape?url_to_scrape"];
    console.log(util.inspect(querystring.parse(req.url)["/scrape?url_to_scrape"]) + '\n');
  	request(url, function (error, response, html) {
  		if(error)
  			console.log(error);
  		
  		var $ = cheerio.load(html);
  		var title, article_url, text, image;
  		var json = {
  			title: "",
  			article_url: "",
  			text: "",
  			image: ""
  		};

  		$('.table-responsive').filter(function () {
  			var data = $(this);
        console.log('scraping data');
  			title = data.find('.table').first().find('tr').first().find('td:nth-child(2)').text();
  			article_url = data.find('p').first().text();
  			text = data.find('.table').first().find('tr:nth-child(3)').find('td:nth-child(2)').text();
  			image = data.find('.table').first().find('tr:nth-child(4)').find('td:nth-child(2)').find('p').find('a').text();
  			console.log('something was scraped');
  			json.title = title;
  			json.article_url = article_url;
  			json.text = text;
  			json.image = image;
    		res.send(json);
        console.log("something was sent");
      });

  	});
});

app.get('/', function (req,res) {
	fs.readFile('index.html', "utf-8", function (err, text) {
		if(err)
			console.log(error);
		res.send(text);
	});
});

app.use(express.static(__dirname + '/assets'));

app.listen('3000');

console.log('Check out port 3000');

exports = module.exports = app;