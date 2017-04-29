describe("PolygonParser", function() {
  var PolygonParser = require("../../polygonparser.js");  
    
  describe("parseFeaturedArticles", function() {
	it("known body, returns expected result", function(done) {
	  // arrange 
	  var requestThatAlwaysReturnsKnownResult = function(url, callback) {
		var error = null,
		  response = { statusCode: 200 },
		  body = `
<div class="c-showcase-eight-up__main">
  <div class="c-entry-box--compact c-entry-box--compact--article c-showcase-eight-up__entry c-entry-box--compact--hero" data-chorus-optimize-id="15240127" data-chorus-optimize-module="entry-box" data-analytics-placement="hero:1">
    <div class="c-entry-box--compact__body">
      <h2 class="c-entry-box--compact__title"><a data-chorus-optimize-field="hed" data-analytics-link="article" href="http://www.polygon.com/2017/4/28/15476086/play-nyc-joins-tribeca-games-and-nycc-as-nycs-game-expos-expand">Play NYC joins Tribeca Games and NY Comic Con as NYC’s game expos expand</a></h2> 
    </div> 
  </div>
  <div class="c-entry-box--compact c-entry-box--compact--article c-showcase-eight-up__entry c-entry-box--compact--hero" data-chorus-optimize-id="15186905" data-chorus-optimize-module="entry-box" data-analytics-placement="hero:2">
    <div class="c-entry-box--compact__body">
      <h2 class="c-entry-box--compact__title"><a data-chorus-optimize-field="hed" data-analytics-link="article" href="http://www.polygon.com/mario-kart-8-deluxe-guide/2017/4/28/15422864/tips-slipstream-items-tricks">Mario Kart 8 Deluxe: Nine tips to give you a head start</a></h2>
    </div>
  </div>
  <div class="c-entry-box--compact c-entry-box--compact--article c-showcase-eight-up__entry c-entry-box--compact--hero" data-chorus-optimize-id="15206077" data-chorus-optimize-module="entry-box" data-analytics-placement="hero:3">
    <div class="c-entry-box--compact__body">
      <h2 class="c-entry-box--compact__title"><a data-chorus-optimize-field="hed" data-analytics-link="article" href="http://www.polygon.com/2017/4/26/15442036/alien-covenant-prometheus-dr-shaw-david">One of Prometheus’ biggest questions has been answered before Alien: Covenant</a></h2>
    </div>
  </div>
</div>
		  `;
		callback(error, response, body);
	  }
	  
	  var polygonParser = new PolygonParser(requestThatAlwaysReturnsKnownResult);
	  
	  // act
	  polygonParser.parseFeaturedArticles(function(result) {
		  
		// assert
  		expect(result.length).toEqual(3);
		expect(result[0].url).toEqual("http://www.polygon.com/2017/4/28/15476086/play-nyc-joins-tribeca-games-and-nycc-as-nycs-game-expos-expand");
		expect(result[0].title).toEqual("Play NYC joins Tribeca Games and NY Comic Con as NYC’s game expos expand");
		expect(result[1].url).toEqual("http://www.polygon.com/mario-kart-8-deluxe-guide/2017/4/28/15422864/tips-slipstream-items-tricks");
		expect(result[1].title).toEqual("Mario Kart 8 Deluxe: Nine tips to give you a head start");
		expect(result[2].url).toEqual("http://www.polygon.com/2017/4/26/15442036/alien-covenant-prometheus-dr-shaw-david");
		expect(result[2].title).toEqual("One of Prometheus’ biggest questions has been answered before Alien: Covenant");
		done();
	  });
    });  
	
	it("body with single quotes, returns expected result", function(done) {
	  // arrange 
	  var requestThatAlwaysReturnsSingleResultWithQuote = function(url, callback) {
		var error = null,
		  response = { statusCode: 200 },
		  body = `
<div class="c-showcase-eight-up__main">
  <div class="c-entry-box--compact c-entry-box--compact--article c-showcase-eight-up__entry c-entry-box--compact--hero" data-chorus-optimize-id="15240127" data-chorus-optimize-module="entry-box" data-analytics-placement="hero:1">
    <div class="c-entry-box--compact__body">
      <h2 class="c-entry-box--compact__title"><a data-chorus-optimize-field="hed" data-analytics-link="article" href="http://www.polygon.com/2017/1/13/14261864/blizzard-bans-10000-overwatch-nukers-in-korea">Blizzard bans 10,000 Overwatch 'nukers' in Korea</a></h2> 
    </div> 
  </div>
</div>
		  `;
		callback(error, response, body);
	  }
	  
	  var polygonParser = new PolygonParser(requestThatAlwaysReturnsSingleResultWithQuote);
	  
	  // act
	  polygonParser.parseFeaturedArticles(function(result) {
		  
		// assert
  		expect(result.length).toEqual(1);
		expect(result[0].url).toEqual("http://www.polygon.com/2017/1/13/14261864/blizzard-bans-10000-overwatch-nukers-in-korea");
		expect(result[0].title).toEqual("Blizzard bans 10,000 Overwatch 'nukers' in Korea");
		done();
	  });
    });  
		
    it("bad status code, returns empty array", function(done) {
	  // arrange 
	  var requestThatAlwaysReturnsBadStatusCode = function(url, callback) {
		var error = null,
		  response = { statusCode: 500 },
		  body = "";
		callback(error, response, body);
	  }
	  
	  var polygonParser = new PolygonParser(requestThatAlwaysReturnsBadStatusCode);
	  
	  // act
	  polygonParser.parseFeaturedArticles(function(result) {  
		  
		// assert
  		expect(result).toEqual([]);
		done();
	  });
    });	
  });
});