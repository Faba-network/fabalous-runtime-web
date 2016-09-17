import {ReactComponent} from "react-router";
import FabaCore from "@fabalous/core/lib/FabaCore";
declare var System;
export default class FabaRoutes {
    path: string;
    component: any;
    indexRoute: { onEnter: (nextState, replace) => {
        //browserHistory.push('#/login/');
    }};
    childRoutes: Array<FabaChildRoute>;

    addChildRoute(route:FabaChildRoute) {
        if (this.childRoutes){
            this.childRoutes = new Array();
        }

        this.childRoutes.push(route);
    }

}

export class FabaChildRoute {
    path: string;
    modulePath:string;

    getComponent(location:string, view:string, cb) {
        System.import(this.modulePath).then(this.loadRouteDash(cb)).catch(this.errorLoading);
    }

    loadRouteDash(cb, view?: string) {
        return (module) => {
            FabaCore.addMediator(module.mediator);

            new module.initEvent(view).dispatch((event)=> {
                cb(null, ()=> {
                    return event.view
                });
            });
        }
    }

    errorLoading(e) {
        throw e;
    }

}