module app.services {
    "use strict";

    export interface IAngularService{}

    export class AngularService implements IAngularService{

        public static $inject = ["$rootScope"];

        constructor(private $rootScope:angular.IRootScopeService){

        }

    }
}