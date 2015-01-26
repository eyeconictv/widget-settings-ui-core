angular.module("risevision.widget.common")
  .factory("imageValidator", ["$q", function ($q) {
    var factory = {
      hasValidExtension: function(url) {
        var extensions = [".jpg", ".jpeg", ".png", ".bmp", ".svg", ".gif"];

        for (var i = 0, len = extensions.length; i < len; i++) {
          if (url.indexOf(extensions[i]) !== -1) {
            return true;
          }
        }

        return false;
      },
      // Verify that URL is a valid image file.
      isImage: function(src) {
        var deferred = $q.defer(),
          image = new Image();

        image.onload = function() {
          deferred.resolve(true);
        };

        image.onerror = function() {
          deferred.resolve(false);
        };

        image.src = src;

        return deferred.promise;
      }
    };

    return factory;
  }]);
