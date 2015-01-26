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
  });
});
