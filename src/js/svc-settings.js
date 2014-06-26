angular.module('risevision.widget.common')
  .service('settingsSaver', ['$q', '$log', 'gadgetsApi', 'settingsParser',
  function ($q, $log, gadgetsApi, settingsParser) {

    this.saveSettings = function (settings, validator) {
      var deferred = $q.defer();

      var alerts = [];

      if (validator) {
        alerts = validator(settings);
      }

      if(alerts.length > 0) {
        $log.debug('Validation failed.', alerts);
        deferred.reject({alerts: alerts});
      }

      var str = settingsParser.encodeParams(settings.params);
      var additionalParamsStr =
        settingsParser.encodeAdditionalParams(settings.additionalParams);

      gadgetsApi.rpc.call('', 'rscmd_saveSettings', function (result) {
        $log.debug('encoded settings', JSON.stringify(result));
        $log.debug('Settings saved. ', settings);

        deferred.resolve(result);
      }, {
        params: str,
        additionalParams: additionalParamsStr
      });



      return deferred.promise;
    };

  }])

  .service('settingsGetter', ['$q', 'gadgetsApi', '$log', 'settingsParser', function ($q, gadgetsApi, $log, settingsParser) {
    this.getAdditionalParams = function () {
      var deferred = $q.defer();

      gadgetsApi.rpc.call('', 'rscmd_getAdditionalParams', function (result) {
        if(result) {
          result = settingsParser.parseAdditionalParams(result);
        }
        else {
          result = {};
        }
        $log.debug('getAdditionalParams returns ', result);
        deferred.resolve(result);
      });

      return deferred.promise;
    };
  }])

  .service('settingsParser', [function () {
    this.parseAdditionalParams = function (additionalParamsStr) {
      if(additionalParamsStr) {
        return JSON.parse(additionalParamsStr);
      }
      else {
        return {};
      }
    };

    this.encodeAdditionalParams = function (additionalParams) {
      return JSON.stringify(additionalParams);
    };

    this.encodeParams = function (params) {
      var str = [];
      for(var p in params) {
        if (params.hasOwnProperty(p)) {
          str.push(encodeURIComponent(p) + '=' + encodeURIComponent(params[p]));
        }
      }
      return '?' + str.join('&');
    };

    this.parseParams = function (paramsStr) {
      //get rid of preceeding '?'
      if(paramsStr[0] === '?') {
        paramsStr = paramsStr.slice(1);
      }
      var result = {};
      var vars = paramsStr.split('&');
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        result[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
      }
      return result;
    };

  }]);
