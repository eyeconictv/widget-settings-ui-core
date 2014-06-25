(function() {

  'use strict';

  /* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

  var chai = require('chai');
  var chaiAsPromised = require('chai-as-promised');

  chai.use(chaiAsPromised);
  var expect = chai.expect;

  var fs = require('fs');

  browser.driver.manage().window().setSize(1024, 768);

  describe('Settings UI', function() {
    it('dummy test - DELETE ME', function () {

    });

    xit('Should correctly load settings', function () {
      //TODO
    });

    xit('Should correctly save settings', function () {
      //TODO
    });
  });
})();
