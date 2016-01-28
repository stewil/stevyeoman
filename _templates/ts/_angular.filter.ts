module app.filters {
    "use strict";

    AngularFilter.$inject = [];

    export function AngularFilter(){
        return function(input:any, args:any){
            return true;
        }
    }
}