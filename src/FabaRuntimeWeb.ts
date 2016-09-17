/**
 * Created by joergwasmeier on 26.12.15.
 */
/// <reference path="./../typings/index.d.ts" />

import FabaCore from "@fabalous/core/FabaCore";
import FabaTransportBase from "@fabalous/core/transport/FabaTransportBase";
//import FabaRoutes from "./FabaRoutes";

import {hashHistory, Router} from "react-router";
import * as React from "react";
import * as ReactDOM from "react-dom";

export default class FabaRuntimeWeb extends FabaCore {
    static servers:Array<any> = [];

    static addServerEndPoint(conn:FabaTransportBase, name:string):void{
        this.servers.push({name:name, conn:conn});
    }

    static sendToEndpoint(event:any, identifyer:string):void{
        if (this.servers.length == 0){
            throw new Error("NO ENDPOINT DEFINED");
        }

        for (var i = 0; i < this.servers.length; i++) {
            this.servers[i].conn.send(event);
        }
    }

    protected renderRoutes(routes:any, container:string = "container"):void {
        if (document.getElementById(container)) {

            //var routes = React.createElement(Router, {routes: routes, history: hashHistory});
            var routesComponent = React.createElement(Router);
            ReactDOM.render(routesComponent, document.getElementById(container));
        } else {
            console.error("Container not set");
        }
    }
}

export function loadRoute(cb) {
    return (module) => cb(null, module.default);
}

export function loadRouteDash(cb, view?:string) {
    return (module) => {
        cb(null, ()=>{return module.default});
    }
}

export function errorLoading(e) {
    throw e;
}