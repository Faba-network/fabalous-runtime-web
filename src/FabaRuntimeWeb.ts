/**
 * Created by joergwasmeier on 26.12.15.
 */

import FabaCoreRuntime from "@fabalous/core/FabaCoreRuntime";
import FabaTransportBase from "@fabalous/core/transport/FabaTransportBase";
import {hashHistory, Router} from "react-router";
import * as React from "react";
import * as ReactDOM from "react-dom";
import FabaCore from "@fabalous/core/FabaCore";
import {IRouterProps} from "react-router";

export default class FabaRuntimeWeb extends FabaCoreRuntime {
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

    protected renderRoutes(containerName:string = 'container') {
        if (document.getElementById(containerName)) {
            var routes = React.createElement(Router, {routes: this.routes(), history: hashHistory});
            ReactDOM.render(routes, document.getElementById('container'));
        }
    }

    public routes():any{};

    static loadFabaRoute(cb, view?:string) {
        return (module) => {
            FabaCore.addMediator(module.mediator);

            new module.initEvent(view).dispatch((event)=>{
                cb(null, ()=>{return event.view});
            });
        }
    }

    static errorLoading(e) {
        throw e;
    }
}