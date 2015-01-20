/* jshint expr:true */
"use strict";

describe("Common Settings", function() {
  var commonSettings, base;

  beforeEach(module("risevision.widget.common"));

  beforeEach(inject(function (_commonSettings_, _STORAGE_URL_BASE_) {
    commonSettings = _commonSettings_;
    base = _STORAGE_URL_BASE_;
  }));

  describe("commonSettings", function () {
    it("should exist", function() {
      expect(commonSettings).be.defined;
    });
  });

  describe("getStorageUrlData()", function () {
    it("should exist", function() {
      expect(commonSettings.getStorageUrlData).be.defined;
      expect(commonSettings.getStorageUrlData).to.be.a("function");
    });

    it("should return an empty object based on non-storage url", function () {
      // non storage url
      var url = "https://s3.amazonaws.com/risecontentfiles/tests/a_RFID.webm";

      expect(commonSettings.getStorageUrlData(url)).to.deep.equal({});
    });

    it("should return an object with folder and fileName properties", function () {
      // storage url, file was within a folder(s)
      var url = "https://storage.googleapis.com/risemedialibrary-dd474bee-b237-46e3-aa20-98e975679773/videos%2Fa_food_show.webm";

      expect(commonSettings.getStorageUrlData(url)).to.deep.equal({
        "folder": "videos",
        "fileName": "a_food_show.webm"
      });
    });

    it("should return an object with empty folder value", function () {
      // storage url, file was not within a folder(s)
      var url = "https://storage.googleapis.com/risemedialibrary-dd474bee-b237-46e3-aa20-98e975679773/a_food_show.webm";

      expect(commonSettings.getStorageUrlData(url)).to.deep.equal({
        "folder": "",
        "fileName": "a_food_show.webm"
      });
    });
  });

});
