/**
 * Created by joergwasmeier on 26.12.15.
 */
/// <reference path="./../typings/index.d.ts" />

import FabaCore from "fabalous-core/core/FabaCore";
import FabaTransportBase from "fabalous-core/transport/FabaTransportBase";
import FabaRoutes from "./FabaRoutes";

import {hashHistory, Router} from "react-router";
import {ReactDOM, React} from "react";

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

    protected renderRoutes(routes:FabaRoutes, container:string = "container"):void {
        if (document.getElementById(container)) {

            var routes = React.createElement(Router, {routes: routes, history: hashHistory});
            ReactDOM.render(routes, document.getElementById(container));
        } else {
            console.error("Container not set");
        }
    }
}