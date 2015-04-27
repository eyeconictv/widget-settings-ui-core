angular.module("risevision.widget.common")
  .constant("STORAGE_FILE_URL_BASE", "storage.googleapis.com/risemedialibrary-")
  .constant("STORAGE_FOLDER_URL_BASE", "googleapis.com/storage/")
  .factory("commonSettings", ["$log", "STORAGE_FILE_URL_BASE", "STORAGE_FOLDER_URL_BASE",
    function ($log, STORAGE_FILE_URL_BASE, STORAGE_FOLDER_URL_BASE) {

    var factory = {
      isStorageUrl: function (url) {
        if ((url.indexOf(STORAGE_FILE_URL_BASE) !== -1) || (url.indexOf(STORAGE_FOLDER_URL_BASE) !== -1)) {
          return true;
        }
        else {
          return false;
        }
      }
    };

    return factory;
  }]);
