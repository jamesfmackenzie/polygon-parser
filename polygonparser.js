// polygonparser.js
var request,
htmlparser = require('htmlparser2');

var PolygonParser = function (request) {
	this.request = request;
};

PolygonParser.prototype.parseFeaturedArticles = function (callback) {
  this.request('http://www.polygon.com/', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	callback(parseFeaturedArticlesFromHtml(body));
      }
	  else {
		console.error(response, error);
        callback([]);
	  }
    });
}

function parseFeaturedArticlesFromHtml(html) {
	var parsedArticles = [],
	insideHeaderSection = false,
	insideHeadlineTag = false,
	tagCount = 0,
	linkText = "",
	parser = new htmlparser.Parser({
    	onopentag: function(name, attribs){
       		if(name == "div" && attribs.class === "m-hero__slider"){
				//console.log("entering header section");
				insideHeaderSection = true;
       		}
			if (insideHeaderSection) {
				tagCount++;
				//console.log(tagCount);
			}
			if (name == "h2" && insideHeaderSection && attribs.class === "m-hero__title") {
				//console.log("entering h2");
				insideHeadlineTag = true;	
			}
			if (name == "a" && insideHeaderSection && insideHeadlineTag) {
				//console.log(attribs.href);
				parsedArticles.push(attribs.href);
			}
    	},
    	ontext: function(text){
			if (insideHeadlineTag) {
				linkText = linkText + text;
			}
    	},
    	onclosetag: function(tagname){
			if (insideHeaderSection) {
				tagCount--;
				//console.log(tagCount);
			}	
			if (tagCount <= 0) {
				//console.log("exiting header section");
				insideHeaderSection = false;
			}
			if (insideHeaderSection && tagname == "h2") {
				var url = parsedArticles.pop();
				//console.log(text);
				parsedArticles.push({ url: url, title: linkText.trim() });
				linkText = "";
				//console.log("exiting h2");
				insideHeadlineTag = false;
			}
       	}
	}, {decodeEntities: true});
	parser.write(html);
	parser.end();

	return parsedArticles;
}

module.exports = PolygonParser;
