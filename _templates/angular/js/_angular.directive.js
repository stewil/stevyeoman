(function() {
    "use strict";

    angular
        .module("myApp.module")
        .directive("angularDirective", AngularDirective);

    AngularDirective.$inject = [];

    function AngularDirective() {
        var directive = {
            link     : link,
            restrict : "EA"
        };

        return directive;

        function link($scope, $element, $attrs) {
        }
    }
})();