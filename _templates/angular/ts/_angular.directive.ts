module app.directives {
    "use strict";

    export class AngularDirective implements angular.IDirective{

        public restrict     : string = "EA";
        public controller   : string = "";
        public controllerAs : string = "";
        public templateUrl  : string = "";
        public scope        : any = {};

        public static Factory(){
            var directive = ($rootScope : angular.IRootScopeService) =>
                new AngularDirective($rootScope);

            directive.$inject = ["$rootScope"];
            return directive;
        }

        constructor(private $rootScope  : angular.IRootScopeService){}

        link = ($scope   : angular.IScope,
                $element : angular.IAugmentedJQuery,
                $attrs   : angular.IAttributes)=>{
        };
    }
}