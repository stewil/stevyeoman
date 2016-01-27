(function () {
    "use strict";
    angular
        .module("angularController.module")
        .directive("angularController", AngularController);

    AngularController.$inject = ["$scope"];

    function AngularController($scope) {
        var vm = this;
    }
})();
