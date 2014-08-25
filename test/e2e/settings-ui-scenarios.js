(function() {

  'use strict';

  /* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

  var chai = require('chai');
  var chaiAsPromised = require('chai-as-promised');

  chai.use(chaiAsPromised);
  var expect = chai.expect;
  browser.driver.manage().window().setSize(1024, 768);

  describe('Settings UI', function() {
    beforeEach(function (){
      browser.get('/test/e2e/test.html?up_id=hello&up_textSetting1=abc&windowSize=200');
    });

    it('Should correctly load settings', function () {
      element(by.id('loadSettings')).click();
      expect(element(by.id('textSettingInParams')).getAttribute('value')).to.eventually.equal('abc');
      expect(element(by.id('textSetting')).getAttribute('value')).to.eventually.equal('hello world');
      expect(element(by.id('checkboxSetting')).getAttribute('checked')).to.eventually.equal('true');
      expect(element(by.id('textAreaSetting')).getText()).to.eventually.equal('the quick brown fox jumps over the lazy dog');
    });

    it('Should correctly save settings', function (done) {
      element(by.id('textSettingInParams')).clear().sendKeys('defg');
      element(by.id('textSetting')).clear().sendKeys('bye world');
      element(by.id('checkboxSetting')).click();
      element(by.id('textAreaSetting')).clear().sendKeys('There is nothing either good or bad but thinking makes it so.');
      element(by.id('saveSettings')).click();
      expect(browser.executeScript('return window.result')).to.eventually.deep.equal(
        {
          'additionalParams': '{"textSetting":"bye world","checkboxSetting":false,"textAreaSetting":"the quick brown fox jumps over the lazy dog"}',
          'params': '?up_textSetting1=defg'
        });
    });

    it('Should correctly close settings', function (done) {
      element(by.id('textSettingInParams')).clear().sendKeys('defg');
      element(by.id('textSetting')).clear().sendKeys('bye world');
      element(by.id('checkboxSetting')).click();
      element(by.id('textAreaSetting')).clear().sendKeys('There is nothing either good or bad but thinking makes it so.');
      element(by.id('closeSettings')).click();
      expect(browser.executeScript('return window.result')).to.eventually.deep.equal(
        {
          'additionalParams': '{"textSetting":"hello world","checkboxSetting":true,"textAreaSetting":"the quick brown fox jumps over the lazy dog"}'
        });
    });
  });
})();
