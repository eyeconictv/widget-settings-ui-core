angular.module("risevision.widget.common")
  .constant("STORAGE_URL_BASE", "storage.googleapis.com/risemedialibrary-")
  .factory("commonSettings", ["$log", "STORAGE_URL_BASE", function ($log, STORAGE_URL_BASE) {

    var factory = {
      getStorageUrlData: function (url) {
        var storage = {},
          str, arr;

        if (url.indexOf(STORAGE_URL_BASE) !== -1) {
          str = url.split(STORAGE_URL_BASE)[1];
          str = decodeURIComponent(str.slice(str.indexOf("/") + 1));
          arr = str.split("/");

          storage.folder = (typeof arr[arr.length - 2] !== "undefined" && arr[arr.length - 2] !== null) ?
            arr[arr.length - 2] : "";
          storage.fileName = arr[arr.length - 1];
        }

        return storage;
      }
    };
    return factory;

  }]);
