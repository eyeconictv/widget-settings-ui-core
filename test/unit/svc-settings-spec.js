/* jshint expr:true */
"use strict";

describe("Settings UI", function() {
  beforeEach(module("risevision.widget.common"));

  var settings = {
    params: {id: "abc", color: "blue", background: {color: "transparent"}},
    additionalParams: {"font-picker-visible": true, "color": "blue"}
  };

  var settingsStr = {
    params: "?up_color=blue&up_background=%7B%22color%22%3A%22transparent%22%7D",
    additionalParams: "{\"font-picker-visible\":true,\"color\":\"blue\"}"
  };

  beforeEach(module(function ($provide) {
    //stub services
    $provide.service("$q", function() {return Q;});
    $provide.value("$window", {
      location: {
        search: "?up_id=abc&up_color=blue&up_background=%7B%22color%22%3A%22transparent%22%7D&windowSize=200"
      }
    });

    $provide.value("gadgetsApi", {
      rpc: function (methodName, callback, params) {
        if(methodName === "rscmd_saveSettings") {
          if(callback) {
            callback(params);
          }
          else{ return params; }
        }
        else if (methodName === "rscmd_getAdditionalParams"){
          if(callback) {
            callback(settingsStr.additionalParams);
          }
        }
        else if (methodName === "rscmd_closeSettings"){
          if(callback) {
            callback(true);
          }
        }
        else {throw "Unknown method"; }
      }
    });
  }));

  describe("settingsSaver", function () {
    it("should exist", function(done) {
      inject(function (settingsSaver) {
        expect(settingsSaver).be.defined;
        done();
      });
    });

    it("should save params and additional params", function (done) {
      inject(function (settingsSaver) {
        settingsSaver.saveSettings(settings).should.eventually.deep.equal(
          settingsStr
        ).notify(done);
      });
    });
  });

  describe("settingsCloser", function () {
    it("should exist", function(done) {
      inject(function (settingsCloser) {
        expect(settingsCloser).be.defined;
        done();
      });
    });

    it("close command should exist", function (done) {
      inject(function (settingsCloser) {
        expect(settingsCloser.closeSettings).be.defined;
        done();
      });
    });

    it("should send close command", function (done) {
      inject(function (settingsCloser) {
        settingsCloser.closeSettings().should.eventually.equal(
          true
        ).notify(done);
      });
    });
  });

  describe("settingsGetter", function () {
    it("should exist", function(done) {
      inject(function (settingsGetter) {
        expect(settingsGetter).be.defined;
        done();
      });
    });

    it("should get additional parameters", function (done) {
      inject(function (settingsGetter) {
        settingsGetter.getAdditionalParams().should.eventually.deep.equal(
          settings.additionalParams
        ).notify(done);
      });
    });

    it("should honor default settings", function (done) {
      module(function ($provide) {
        //stub services
        $provide.value("defaultSettings", {
          params: {id: "ddd", message: "yolo"}, //id should not be overridden
                                                //windowSize should be ignored
          additionalParams: { color: "red", greetings: "hello" } //color should not be overriden
        });
      });

      inject(function (settingsGetter) {

        settingsGetter.getParams().should.deep.equal(
          angular.extend(settings.params, {message: "yolo"})
        );

        settingsGetter.getAdditionalParams().should.eventually.deep.equal(
          angular.extend(settings.additionalParams, {greetings: "hello"})
        ).notify(done);
      });
    });

  });

  describe("settingsParser", function () {

    var params = {
      "layout": "three-day", "address": "geolocation",
      "custom-address": null, "description":"service",
      "unit":"celsius", "wind-speed":"kph",
      "background-color": null, "show-humidity": true,
      "terms": true
    };

    var paramsStr = "?up_layout=three-day&up_address=geolocation&up_custom-address"+
    "=null&up_description=service&up_unit=celsius&up_wind-speed=kph&up_background-"+
    "color=null&up_show-humidity=true&up_terms=true";

    var additionalParamsStr = "{\"layout-url\":\"\",\"custom-description\":\"\"," +
    "\"current-temp-font\":\"Verdana\",\"current-temp-font-style\":\"Verdana, Geneva," +
    " sans-serif\",\"current-temp-font-url\":\"\",\"current-temp-font-size\":\"60\","+
    "\"current-temp-bold\":true,\"current-temp-italic\":false,\"current-temp-color\":" +
    "\"rgba(0, 0, 0, 1)\",\"forecast-temp-font\":\"Verdana\",\"forecast-temp-font-style\"" +
    ":\"Verdana, Geneva, sans-serif\",\"forecast-temp-font-url\":\"\","+
    "\"forecast-temp-font-size\":\"20\",\"forecast-temp-bold\":false,"+
    "\"forecast-temp-italic\":false,\"forecast-temp-color\":\"rgba(0, 0, 0, 1)\","+
    "\"forecast-day-font\":\"Verdana\",\"forecast-day-font-style\":\"Verdana, Geneva,"+
    " sans-serif\",\"forecast-day-font-url\":\"\",\"forecast-day-font-size\":\"20\","+
    "\"forecast-day-bold\":true,\"forecast-day-italic\":false,\"forecast-day-color\""+
    ":\"rgba(0, 0, 0, 1)\",\"address-font\":\"Verdana\",\"address-font-style\":\"Verdana,"+
    " Geneva, sans-serif\",\"address-font-url\":\"\",\"address-font-size\":\"24\","+
    "\"address-bold\":true,\"address-italic\":false,\"address-color\":\"rgba(0, 0, 0,"+
    " 1)\",\"humidity-font\":\"Verdana\",\"humidity-font-style\":\"Verdana, Geneva, "+
    "sans-serif\",\"humidity-font-url\":\"\",\"humidity-font-size\":\"20\",\"humidity-bold"+
    "\":false,\"humidity-italic\":false,\"humidity-color\":\"rgba(0, 0, 0, 1)\"}";

    var additionalParams = {
      "layout-url": "",
      "custom-description": "",
      "current-temp-font": "Verdana",
      "current-temp-font-style": "Verdana, Geneva, sans-serif",
      "current-temp-font-url": "",
      "current-temp-font-size": "60",
      "current-temp-bold": true,
      "current-temp-italic": false,
      "current-temp-color": "rgba(0, 0, 0, 1)",
      "forecast-temp-font": "Verdana",
      "forecast-temp-font-style": "Verdana, Geneva, sans-serif",
      "forecast-temp-font-url": "",
      "forecast-temp-font-size": "20",
      "forecast-temp-bold": false,
      "forecast-temp-italic": false,
      "forecast-temp-color": "rgba(0, 0, 0, 1)",
      "forecast-day-font": "Verdana",
      "forecast-day-font-style": "Verdana, Geneva, sans-serif",
      "forecast-day-font-url": "",
      "forecast-day-font-size": "20",
      "forecast-day-bold": true,
      "forecast-day-italic": false,
      "forecast-day-color": "rgba(0, 0, 0, 1)",
      "address-font": "Verdana",
      "address-font-style": "Verdana, Geneva, sans-serif",
      "address-font-url": "",
      "address-font-size": "24",
      "address-bold": true,
      "address-italic": false,
      "address-color": "rgba(0, 0, 0, 1)",
      "humidity-font": "Verdana",
      "humidity-font-style": "Verdana, Geneva, sans-serif",
      "humidity-font-url": "",
      "humidity-font-size": "20",
      "humidity-bold": false,
      "humidity-italic": false,
      "humidity-color": "rgba(0, 0, 0, 1)"
    };

    it("should exist", function(done) {
      inject(function (settingsParser) {
        expect(settingsParser).be.defined;
        done();
      });
    });

    it("should parse params string", function() {
      inject(function (settingsParser) {
        settingsParser.parseParams(paramsStr).
          should.deep.equal(params);
      });
    });

    it("should encode params to string", function() {
      inject(function (settingsParser) {
        settingsParser.encodeParams(params).
          should.equal(paramsStr);
      });
    });

    it("should parse additional params string", function() {
      inject(function (settingsParser) {
        settingsParser.parseAdditionalParams(additionalParamsStr).
          should.deep.equal(additionalParams);
      });
    });

    it("should encode additional params to string", function() {
      inject(function (settingsParser) {
        settingsParser.encodeAdditionalParams(additionalParams).
          should.equal(additionalParamsStr);
      });
    });
  });
});
