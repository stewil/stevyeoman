(function () {
    "use strict";
    angular
        .module("myApp.module")
        .directive("angularController", AngularController);

    AngularController.$inject = ["$scope"];

    function AngularController($scope) {
        var vm = this;
    }
})();
