/**
 * Created by joergwasmeier on 26.12.15.
 */

import FabaCoreRuntime from "@fabalous/core/FabaCoreRuntime";
import FabaTransportBase from "@fabalous/core/transport/FabaTransportBase";
import FabaCore from "@fabalous/core/FabaCore";
import {IRoutes} from "./routes/IRoutes";
import {FabaWebRoutes} from "./routes/FabaWebRoutes";
import FabaRuntimeWebMediator from "./FabaRuntimeWebMediator";
import RenderToDOMEvent from "./event/RenderToDOMEvent";
import FabaStore from "@fabalous/core/FabaStore";
import LoadModuleEvent from "./event/LoadModuleEvent";

export default class FabaRuntimeWeb extends FabaCoreRuntime {
    static servers:Array<any> = [];
    static activeModule: any;
    static activeArgs: Array<string>;
    static activeEvent: any;

    routes:FabaWebRoutes;
    static rootComponent:any;

    constructor(store:FabaStore<any>){
        super(store);
        FabaCore.addMediator(FabaRuntimeWebMediator);
    }

    enableHotReload(module){
        if (module.hot) {
            module.hot.accept();

            module.hot.dispose(() => {
                FabaCore.reset();
            });
        }
    }

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

    handleRoutes(pathname?: string) {
        if (!pathname) pathname = window.location.hash.replace("#", "");

        // Split path
        let path: Array<string> = pathname.split("/");
        let matches: Array<IRoutes> = [];

        // Check if firstname fits
        for (let i = 1; i < path.length; i++) {
            let urlPath = path[i];
            if (urlPath.length > 1) {
                for (let m = 0; m < this.routes.getRoutes().length; m++) {
                    let route = this.routes.getRoutes()[m];

                    if (route.route.indexOf(urlPath) > -1) {
                        matches.push(route);
                    }
                }
            }
        }

        if (matches.length > 0) {
            new LoadModuleEvent(matches[0].module, this.normalizeUrlPath(path)).dispatch();
        } else {
            new LoadModuleEvent(this.routes.getRoutes()[0].module, this.normalizeUrlPath(path)).dispatch();
        }
    }

    normalizeUrlPath(path: Array<string>) {
        let normPath: Array<string> = [];

        for (var i = 1; i < path.length; i++) {
            var obj = path[i];
            if (obj.length >= 1) normPath.push(obj);
        }

        return normPath;
    }
}