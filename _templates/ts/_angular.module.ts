/// <reference path="./_angular.controller.ts" />
/// <reference path="./_angular.directive.ts" />
/// <reference path="./_angular.filter.ts" />
/// <reference path="./_angular.service.ts" />
module app.module {
    angular.module("myApplication.module", [])
    .controller("myController", app.controllers.AngularController)
    .directive("myDirective", app.directives.AngularDirective.Factory())
    .service("myService", app.services.AngularService)
    .filter("myFilter", app.filters.AngularFilter);
}