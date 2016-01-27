(function() {
    "use strict";

    angular
        .module("angularDirective.module")
        .directive("angularDirective", AngularDirective);

    AngularDirective.$inject = [];

    function AngularDirective() {
        var directive = {
            link     : link,
            restrict : "A"
        };

        return directive;

        function link($scope, $element, $attrs) {
        }
    }
})();