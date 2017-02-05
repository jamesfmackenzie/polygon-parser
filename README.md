# polygon-parser
Parse article data from Polygon home page (http://www.polygon.com)

## Usage
```javascript
var request = require("request");
PolygonParser = require("polygon-parser"),
var polygonParser = new PolygonParser(request);

polygonParser.parseFeaturedArticles(function(featuredArticles) {
  console.log(featuredArticles);
});
```
