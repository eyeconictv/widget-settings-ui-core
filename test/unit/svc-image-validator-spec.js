/* jshint expr:true */
"use strict";

describe("Image Validator", function() {
  var imageValidator;

  beforeEach(module("risevision.widget.common"));

  beforeEach(inject(function (_imageValidator_) {
    imageValidator = _imageValidator_;
  }));


  describe("imageValidator", function () {
    it("should exist", function() {
      expect(imageValidator).to.be.defined;
    });

    it("should return true for a .jpg file", function() {
      expect(imageValidator.hasValidExtension("http://fakeurl.com/my-image.jpg")).to.be.true;
    });

    it("should return true for a .jpeg file", function() {
      expect(imageValidator.hasValidExtension("http://fakeurl.com/my-image.jpeg")).to.be.true;
    });

    it("should return true for a .png file", function() {
      expect(imageValidator.hasValidExtension("http://fakeurl.com/my-image.png")).to.be.true;
    });

    it("should return true for a .bmp file", function() {
      expect(imageValidator.hasValidExtension("http://fakeurl.com/my-image.bmp")).to.be.true;
    });

    it("should return true for a .svg file", function() {
      expect(imageValidator.hasValidExtension("http://fakeurl.com/my-image.svg")).to.be.true;
    });

    it("should return true for a .gif file", function() {
      expect(imageValidator.hasValidExtension("http://fakeurl.com/my-image.gif")).to.be.true;
    });

    it("should return false for non-image file", function() {
      expect(imageValidator.hasValidExtension("http://fakeurl.com/my-image")).to.be.false;
    });
  });
});
