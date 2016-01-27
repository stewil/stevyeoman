(function(){
    "use strict";

    angular.module('myApp.module', [])
        .filter('AngularFilter');

    AngularFilter.$inject = [];

    function AngularFilter(){
        return function(input, args){
            return true;
        }
    }
})();