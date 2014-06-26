/* jshint expr:true */
'use strict';

describe('Settings UI', function() {
  beforeEach(module('risevision.widget.common'));

    var settings = {
      params: {up_id: 'world_clock'},
      additionalParams: {'font-picker-visible': true, 'color': 'blue'}
    };

    var settingsStr = {
      params: '?up_id=world_clock',
      additionalParams: '{"font-picker-visible":true,"color":"blue"}'
    };

    beforeEach(module(function ($provide) {
    //stub services
    $provide.service('$q', function() {return Q;});
    $provide.value('$window', {
      locaiton: {
        search: '?up_id=abc'
      }
    });

    $provide.value('gadgetsApi', {
      rpc: function (methodName, callback, params) {
        if(methodName === 'rscmd_saveSettings') {
          if(callback) {
            callback(params);
          }
          else{ return params; }
        }
        else if (methodName === 'rscmd_getAdditionalParams'){
          if(callback) {
            callback(settingsStr.additionalParams);
          }
        }
        else {throw 'Unknown method'; }
      }
    });
  }));

  describe('settingsSaver', function () {
    it('should exist', function(done) {
      inject(function (settingsSaver) {
        expect(settingsSaver).be.defined;
        done();
      });
    });

    it('should save params and additional params', function (done) {
      inject(function (settingsSaver) {
        settingsSaver.saveSettings(settings).should.eventually.deep.equal(
          settingsStr
        ).notify(done);
      });
    });
  });

  describe('settingsGetter', function () {
    it('should exist', function(done) {
      inject(function (settingsGetter) {
        expect(settingsGetter).be.defined;
        done();
      });
    });

    it('should get additional parameters', function (done) {
      inject(function (settingsGetter) {
        settingsGetter.getAdditionalParams().should.eventually.deep.equal(
          settings.additionalParams
        ).notify(done);
      });
    });

  });

  describe('settingsParser', function () {

    var params = {
      'up_layout': 'three-day', 'up_address': 'geolocation',
      'up_custom-address': '', 'up_description':'service',
      'up_unit':'celsius', 'up_wind-speed':'kph',
      'up_background-color':'', 'up_show-humidity': 'true',
      'up_terms': 'true'
    };

    var paramsStr = '?up_layout=three-day&up_address=geolocation&up_custom-address'+
    '=&up_description=service&up_unit=celsius&up_wind-speed=kph&up_background-colo'+
    'r=&up_show-humidity=true&up_terms=true';

    var additionalParamsStr = '{"layout-url":"","custom-description":"",' +
    '"current-temp-font":"Verdana","current-temp-font-style":"Verdana, Geneva,' +
    ' sans-serif","current-temp-font-url":"","current-temp-font-size":"60",'+
    '"current-temp-bold":true,"current-temp-italic":false,"current-temp-color":' +
    '"rgba(0, 0, 0, 1)","forecast-temp-font":"Verdana","forecast-temp-font-style"' +
    ':"Verdana, Geneva, sans-serif","forecast-temp-font-url":"",'+
    '"forecast-temp-font-size":"20","forecast-temp-bold":false,'+
    '"forecast-temp-italic":false,"forecast-temp-color":"rgba(0, 0, 0, 1)",'+
    '"forecast-day-font":"Verdana","forecast-day-font-style":"Verdana, Geneva,'+
    ' sans-serif","forecast-day-font-url":"","forecast-day-font-size":"20",'+
    '"forecast-day-bold":true,"forecast-day-italic":false,"forecast-day-color"'+
    ':"rgba(0, 0, 0, 1)","address-font":"Verdana","address-font-style":"Verdana,'+
    ' Geneva, sans-serif","address-font-url":"","address-font-size":"24",'+
    '"address-bold":true,"address-italic":false,"address-color":"rgba(0, 0, 0,'+
    ' 1)","humidity-font":"Verdana","humidity-font-style":"Verdana, Geneva, '+
    'sans-serif","humidity-font-url":"","humidity-font-size":"20","humidity-bold'+
    '":false,"humidity-italic":false,"humidity-color":"rgba(0, 0, 0, 1)"}';

    var additionalParams = {
      'layout-url': '',
      'custom-description': '',
      'current-temp-font': 'Verdana',
      'current-temp-font-style': 'Verdana, Geneva, sans-serif',
      'current-temp-font-url': '',
      'current-temp-font-size': '60',
      'current-temp-bold': true,
      'current-temp-italic': false,
      'current-temp-color': 'rgba(0, 0, 0, 1)',
      'forecast-temp-font': 'Verdana',
      'forecast-temp-font-style': 'Verdana, Geneva, sans-serif',
      'forecast-temp-font-url': '',
      'forecast-temp-font-size': '20',
      'forecast-temp-bold': false,
      'forecast-temp-italic': false,
      'forecast-temp-color': 'rgba(0, 0, 0, 1)',
      'forecast-day-font': 'Verdana',
      'forecast-day-font-style': 'Verdana, Geneva, sans-serif',
      'forecast-day-font-url': '',
      'forecast-day-font-size': '20',
      'forecast-day-bold': true,
      'forecast-day-italic': false,
      'forecast-day-color': 'rgba(0, 0, 0, 1)',
      'address-font': 'Verdana',
      'address-font-style': 'Verdana, Geneva, sans-serif',
      'address-font-url': '',
      'address-font-size': '24',
      'address-bold': true,
      'address-italic': false,
      'address-color': 'rgba(0, 0, 0, 1)',
      'humidity-font': 'Verdana',
      'humidity-font-style': 'Verdana, Geneva, sans-serif',
      'humidity-font-url': '',
      'humidity-font-size': '20',
      'humidity-bold': false,
      'humidity-italic': false,
      'humidity-color': 'rgba(0, 0, 0, 1)'
    };

    it('should exist', function(done) {
      inject(function (settingsParser) {
        expect(settingsParser).be.defined;
        done();
      });
    });

    it('should parse params string', function() {
      inject(function (settingsParser) {
        settingsParser.parseParams(paramsStr).
          should.deep.equal(params);
      });
    });

    it('should encode params to string', function() {
      inject(function (settingsParser) {
        settingsParser.encodeParams(params).
          should.equal(paramsStr);
      });
    });

    it('should parse additional params string', function() {
      inject(function (settingsParser) {
        settingsParser.parseAdditionalParams(additionalParamsStr).
          should.deep.equal(additionalParams);
      });
    });

    it('should encode additional params to string', function() {
      inject(function (settingsParser) {
        settingsParser.encodeAdditionalParams(additionalParams).
          should.equal(additionalParamsStr);
      });
    });
  });
});
