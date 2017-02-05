describe("PolygonParser", function() {
  var PolygonParser = require("../../polygonparser.js");  
    
  describe("parseFeaturedArticles", function() {
	it("known body, returns expected result", function(done) {
	  // arrange 
	  var requestThatAlwaysReturnsKnownResult = function(url, callback) {
		var error = null,
		  response = { statusCode: 200 },
		  body = `
              <div class="m-hero__slider">
                  <div class="m-hero__entry entry_1 entry-type-feature chorus-optimize" data-chorus-optimize-id="14073565" data-chorus-optimize-module="hero-block">
                      <div class="m-hero__image vox-lazy-load lazy-loaded" data-chorus-optimize-field="main_image" data-original="https://cdn0.vox-cdn.com/thumbor/pqO_2j6xZzpaMkdo-oq2FoffmKI=/1200x0:2640x2160/347x520/filters:format(webp)/cdn0.vox-cdn.com/uploads/chorus_image/image/52804203/GRW_screen_SanctuaryNoLogo_e3_160613_230pm_1465814863.0.png" data-imgkey="52804203:*:5" data-dim="293x450" style="background-image: url(&quot;https://cdn0.vox-cdn.com/thumbor/pqO_2j6xZzpaMkdo-oq2FoffmKI=/1200x0:2640x2160/347x520/filters:format(webp)/cdn0.vox-cdn.com/uploads/chorus_image/image/52804203/GRW_screen_SanctuaryNoLogo_e3_160613_230pm_1465814863.0.png&quot;);">
                          <div class="m-hero__meta entry-type-feature">
                              <h2 class="m-hero__title"><a data-analytics-link="hero" data-chorus-optimize-field="hed" href="http://www.polygon.com/features/2017/1/18/14309524/ghost-recon-wildlands-santa-muerte-cartel-bolivia">Ghost Recon: Going to war against a devout drug cartel</a></h2>
                          </div>
                      </div>
                  </div>
                  <div class="m-hero__entry entry_2 entry-type-article chorus-optimize" data-chorus-optimize-id="14074719" data-chorus-optimize-module="hero-block">
                      <div class="m-hero__image vox-lazy-load lazy-loaded" data-chorus-optimize-field="main_image" data-original="https://cdn0.vox-cdn.com/thumbor/TktEOiN020T2OLCRKrw-ODvbhOo=/282x0:1800x1012/400x268/filters:format(webp)/cdn0.vox-cdn.com/uploads/chorus_image/image/52805037/best_buy_gear_vr.0.jpg" data-imgkey="52805037:*:5" data-dim="292x225" style="background-image: url(&quot;https://cdn0.vox-cdn.com/thumbor/TktEOiN020T2OLCRKrw-ODvbhOo=/282x0:1800x1012/400x268/filters:format(webp)/cdn0.vox-cdn.com/uploads/chorus_image/image/52805037/best_buy_gear_vr.0.jpg&quot;);">
                          <div class="m-hero__meta entry-type-article">
                              <h2 class="m-hero__title"><a data-analytics-link="hero" data-chorus-optimize-field="hed" href="http://www.polygon.com/2017/1/18/14310678/oculus-lawsuit-vr-impact-analysis">Oculus lawsuit may undercut VR industry, not just Facebook's bottom line</a></h2>
                          </div>
                      </div>
                  </div>
                  <div class="m-hero__entry entry_3 entry-type-article chorus-optimize" data-chorus-optimize-id="14076723" data-chorus-optimize-module="hero-block">
                      <div class="m-hero__image vox-lazy-load lazy-loaded" data-chorus-optimize-field="main_image" data-original="https://cdn0.vox-cdn.com/thumbor/7ttTUaObd01t1Dl2nvI2qX4Hzkg=/150x0:1770x1080/400x268/filters:format(webp)/cdn0.vox-cdn.com/uploads/chorus_image/image/52807375/NintendoSwitch_ARMS_Presentation2017_scrn01_bmp_jpgcopy.0.jpg" data-imgkey="52807375:*:5" data-dim="292x225" style="background-image: url(&quot;https://cdn0.vox-cdn.com/thumbor/7ttTUaObd01t1Dl2nvI2qX4Hzkg=/150x0:1770x1080/400x268/filters:format(webp)/cdn0.vox-cdn.com/uploads/chorus_image/image/52807375/NintendoSwitch_ARMS_Presentation2017_scrn01_bmp_jpgcopy.0.jpg&quot;);">
                          <div class="m-hero__meta entry-type-article">
                              <h2 class="m-hero__title"><a data-analytics-link="hero" data-chorus-optimize-field="hed" href="http://www.polygon.com/2017/1/18/14312682/nintendo-switch-arms-fanart">Arms already has one of the Switch’s most devoted fanbases</a></h2>
                          </div>
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
		expect(result[0].url).toEqual("http://www.polygon.com/features/2017/1/18/14309524/ghost-recon-wildlands-santa-muerte-cartel-bolivia");
		expect(result[0].title).toEqual("Ghost Recon: Going to war against a devout drug cartel");
		expect(result[1].url).toEqual("http://www.polygon.com/2017/1/18/14310678/oculus-lawsuit-vr-impact-analysis");
		expect(result[1].title).toEqual("Oculus lawsuit may undercut VR industry, not just Facebook's bottom line");
		expect(result[2].url).toEqual("http://www.polygon.com/2017/1/18/14312682/nintendo-switch-arms-fanart");
		expect(result[2].title).toEqual("Arms already has one of the Switch’s most devoted fanbases");
		done();
	  });
    });  
	
	it("body with single quotes, returns expected result", function(done) {
	  // arrange 
	  var requestThatAlwaysReturnsSingleResultWithQuote = function(url, callback) {
		var error = null,
		  response = { statusCode: 200 },
		  body = `
              <div class="m-hero__slider">
                  <div class="m-hero__entry entry_1 entry-type-feature chorus-optimize" data-chorus-optimize-id="14073565" data-chorus-optimize-module="hero-block">
                      <div class="m-hero__image vox-lazy-load lazy-loaded" data-chorus-optimize-field="main_image">
                          <div class="m-hero__meta entry-type-feature">
                              <h2 class="m-hero__title"><a data-analytics-link="hero" data-chorus-optimize-field="hed" href="http://www.polygon.com/2017/1/13/14261864/blizzard-bans-10000-overwatch-nukers-in-korea">Blizzard bans 10,000 Overwatch 'nukers' in Korea</a></h2>
                          </div>
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