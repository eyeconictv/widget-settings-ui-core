/* jshint expr:true */
"use strict";

describe("Common Settings", function() {
  var commonSettings;

  beforeEach(module("risevision.widget.common"));

  beforeEach(inject(function (_commonSettings_) {
    commonSettings = _commonSettings_;
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
      var url = "https://storage.googleapis.com/risemedialibrary-xxx/videos%2Fa_food_show.webm";

      expect(commonSettings.getStorageUrlData(url)).to.deep.equal({
        "folder": "videos/",
        "fileName": "a_food_show.webm",
        "companyId": "xxx"
      });
    });

    it("should return an object with empty folder value", function () {
      // storage url, file was not within a folder(s)
      var url = "https://storage.googleapis.com/risemedialibrary-xxx/a_food_show.webm";

      expect(commonSettings.getStorageUrlData(url)).to.deep.equal({
        "folder": "",
        "fileName": "a_food_show.webm",
        "companyId": "xxx"
      });
    });

    it("should return an object with file name and nested folder value", function () {
      // storage url, file was within nested folders
      var url = "https://storage.googleapis.com/risemedialibrary-xxx/videos%2Fwebm%2Fa_food_show.webm";

      expect(commonSettings.getStorageUrlData(url)).to.deep.equal({
        "folder": "videos/webm/",
        "fileName": "a_food_show.webm",
        "companyId": "xxx"
      });
    });

    it("should return an object with empty fileName value as only folder was selected", function () {
      // storage url, file was not within a folder(s)
      var url = "https://www.googleapis.com/storage/v1/b/risemedialibrary-xxx/o?prefix=images%2F",
        nestedUrl = "https://www.googleapis.com/storage/v1/b/risemedialibrary-xxx/o?prefix=images%2Fpng%2F";

      expect(commonSettings.getStorageUrlData(url)).to.deep.equal({
        "folder": "images/",
        "fileName": "",
        "companyId": "xxx"
      });

      // storage folder selected, and folder is nested
      expect(commonSettings.getStorageUrlData(nestedUrl)).to.deep.equal({
        "folder": "images/png/",
        "fileName": "",
        "companyId": "xxx"
      });
    });

  });

});
