/* jshint expr:true */
'use strict';

describe('Settings UI', function() {
  beforeEach(module('risevision.widget.common'));

  describe('settingsSaver', function () {
    it('should exist', function(done) {
      inject(function (settingsSaver) {
        expect(settingsSaver).be.defined;
        done();
      });
    });

    xit('should save parameters', function () {
      //TODO
    });

    xit('should save additional parameters', function () {
      //TODO
    });
  });

  describe('settingsGetter', function () {
    it('should exist', function(done) {
      inject(function (settingsGetter) {
        expect(settingsGetter).be.defined;
        done();
      });
    });

    xit('should get parameters', function () {
      //TODO
    });

    xit('should get additional parameters', function () {
      //TODO
    });

  });

  describe('settingsParser', function () {
    it('should exist', function(done) {
      inject(function (settingsParser) {
        expect(settingsParser).be.defined;
        done();
      });
    });

    xit('should parse params string', function () {
      //TODO
    });

    xit('should encode params to string', function () {
      //TODO
    });

    xit('should parse additional params string', function () {
      //TODO
    });

    xit('should encode additional params to string', function () {
      //TODO
    });
  });
});
