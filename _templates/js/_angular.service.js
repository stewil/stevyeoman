(function () {
    "use strict";

    angular
        .module("myApp.module")
        .service("angularService", AngularService);

    AngularService.$inject = [];

    function AngularService() {
    }
})();