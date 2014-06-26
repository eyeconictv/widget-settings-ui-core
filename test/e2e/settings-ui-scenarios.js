(function() {

  'use strict';

  /* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

  var chai = require('chai');
  var chaiAsPromised = require('chai-as-promised');
  // var fs = require('fs');

  chai.use(chaiAsPromised);
  var expect = chai.expect;
  browser.driver.manage().window().setSize(1024, 768);

  describe('Settings UI', function() {
    beforeEach(function (){
      browser.get('/test/e2e/test.html?up_id=hello&textSetting1=abc');
    });

    it('Should correctly load settings', function () {
      expect(element(by.id('textSettingInParams')).getAttribute('value')).to.eventually.equal('abc');
      expect(element(by.id('textSetting')).getAttribute('value')).to.eventually.equal('hello world');
      expect(element(by.id('checkboxSetting')).getAttribute('checked')).to.eventually.equal('true');

      // browser.takeScreenshot().then(function(png) {
      //   var stream = fs.createWriteStream("/tmp/screenshot.png");
      //     stream.write(new Buffer(png, "base64"));
      //     stream.end();
      //   });
    });

    xit('Should correctly save settings', function () {
      //TODO
    });
  });
})();
