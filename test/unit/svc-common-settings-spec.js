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

  describe("isStorageUrl", function () {
    it("should exist", function() {
      expect(commonSettings.isStorageUrl).be.defined;
      expect(commonSettings.isStorageUrl).to.be.a("function");
    });

    it("should return false for a non-Storage URL", function () {
      var url = "https://s3.amazonaws.com/risecontentfiles/tests/a_RFID.webm";

      expect(commonSettings.isStorageUrl(url)).to.equal(false);
    });

    it("should return true for a Storage folder", function () {
      var url = "https://www.googleapis.com/storage/v1/b/risemedialibrary-abc123/o?prefix=videos%2F";

      expect(commonSettings.isStorageUrl(url)).to.equal(true);
    });

    it("should return true for a Storage file", function () {
      var url = "https://storage.googleapis.com/risemedialibrary-abc123/a_RFID.webm";

      expect(commonSettings.isStorageUrl(url)).to.equal(true);
    });
  });
});
