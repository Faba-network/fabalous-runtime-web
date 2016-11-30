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

export default class FabaRuntimeWeb extends FabaCoreRuntime {
    static servers:Array<any> = [];
    activeModule: any;
    activeArgs: Array<string>;
    activeEvent: any;

    routes:FabaWebRoutes;

    rootComponent:any;

    constructor(store:FabaStore<any>){
        super();

        FabaCore.addMediator(FabaRuntimeWebMediator);
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
            this.loadModule(matches[0].module, this.normalizeUrlPath(path));
        } else {
            this.loadModule(this.routes.getRoutes()[0].module, this.normalizeUrlPath(path));
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

    async loadModule(loadfun: any, args?: Array<string>):Promise<void> {
        if (!loadfun) return;

        if (this.activeModule === loadfun &&
            this.activeArgs === args && this.activeEvent) {
            let k = await this.activeEvent.dispatch();
            this.render(k.view);
            return;
        }

        this.activeModule = loadfun;
        this.activeArgs = args;

        let comp = await loadfun();
        FabaCore.addMediator(comp.mediator);

        let t: any = new comp.initEvent;
        t.args = args;

        this.activeEvent = t;
        let k = await t.dispatch();
        this.render(k.view);
    }

    render(child?) {
        new RenderToDOMEvent(this.rootComponent, "container", child).dispatch();
    }
}