/*jshint expr:true */
"use strict";

describe("Services: visualizationApi", function() {

  beforeEach(module("risevision.widget.common.visualization"));

  it("should exist", function(done) {
    inject(function(visualizationApi) {
      expect(visualizationApi).be.defined;
      done();
    });
  });

  it("should return visualization", function(done) {
    inject(function(visualizationApi) {
      expect(visualizationApi.getVisualization).be.defined;
      done();
    });
  });

});
