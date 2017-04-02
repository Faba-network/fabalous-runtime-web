/**
 * Created by joergwasmeier on 26.12.15.
 */

import FabaCoreRuntime from "@fabalous/core/FabaCoreRuntime";
import FabaCore from "@fabalous/core/FabaCore";
import {IRoutes} from "./routes/IRoutes";
import {FabaWebRoutes} from "./routes/FabaWebRoutes";
import FabaStore from "@fabalous/core/FabaStore";
import LoadModuleEvent from "./event/LoadModuleEvent";
import {createHashHistory} from "history";
import FabaCoreTransportBase from "@fabalous/core/transport/FabaCoreTransportBase";

import {FabaWebMediator} from "./FabaWebMediator";
import ChangeMediaQueryEvent from "./event/ChangeMediaQueryEvent";
import ChangeMediaQueryCommand from "./command/ChangeMediaQueryCommand";
import ChangeRouteEvent from "./event/ChangeRouteEvent";
import ChangeRouteCommand from "./command/ChangeRouteCommand";
import ChangeUrlEvent from "./event/ChangeUrlEvent";
import ChangeUrlCommand from "./command/ChangeUrlCommand";
import RenderToDOMEvent from "./event/RenderToDOMEvent";
import RenderToDOMCommand from "./command/RenderToDOMCommand";
import FabaStoreUpdateEvent from "@fabalous/core/FabaStoreUpdateEvent";
import StoreUpdateCommand from "./command/StoreUpdateCommand";
import LoadModuleCommand from "./command/LoadModuleCommand";

/**
 * Runtime class and startpoint for web Project's
 * 
 * Extend this class with your own logic.
 * 
 * Need an store (FabaStore or FabaImmutableStore) as argument
 */

export default class FabaRuntimeWeb extends FabaCoreRuntime {
    static servers: Array<any> = [];
    static activeModule: any;
    static activeArgs: Array<string>;
    static activeEvent: any;

    private history = createHashHistory();
    static rootComponent: any;

    listener: any;
    routes: FabaWebRoutes;

<<<<<<< HEAD
    /**
     * Contructor expets an store and register the FabaRuntimeWebMediator
     * @param store FabaStore or FabaImmutableStore which is avaible for the commands
     */
    constructor(store:FabaStore<any>){
=======
    constructor(store: FabaStore<any>, routes, rootComp, module) {
>>>>>>> 192425a354cf010751d56e43e738d316a2c7ee8c
        super(store);
        this.routes = routes;
        FabaRuntimeWeb.rootComponent = rootComp;

        FabaCore.addMediator(FabaRuntimeWebMediator);

        this.enableHotReload(module);

        if (this.listener) this.listener();
        this.listener = this.history.listen((location) => {
            this.handleRoutes(location.pathname);
        });

        this.handleRoutes();
    }

<<<<<<< HEAD
    /**
     * Add's server inouts that can be used in the commands
     * @param conn Connection Object (Socket / Http.....)
     * @param name Name of the Connection
     */
    static addServerEndPoint(conn:FabaTransportBase, name:string):void{
        this.servers.push({name:name, conn:conn});
    }

    /**
     * TODO: Need to be refactored and integraded in the commands
     * 
     * Static function that send an event to an ENDPOINT (Obsulute)
     * @param event Any FabaEvent object
     * @param identifyer Identifyer of the Endpoint that should be used
     */
    static sendToEndpoint(event:any, identifyer:string):void{
        if (this.servers.length == 0){
=======
    enableHotReload(module) {
        if (module.hot) {
            module.hot.accept();

            module.hot.dispose(() => {
                FabaCore.reset();
            });
        }
    }

    static addServerEndPoint(conn: FabaCoreTransportBase, name: string): void {
        this.servers.push({name: name, conn: conn});
    }

    static sendToEndpoint(event: any, identifyer: string): void {
        if (this.servers.length == 0) {
>>>>>>> 192425a354cf010751d56e43e738d316a2c7ee8c
            throw new Error("NO ENDPOINT DEFINED");
        }

        for (var i = 0; i < this.servers.length; i++) {
            this.servers[i].conn.send(event);
        }
    }

    /**
     * Handle the routes it hey change
     * @param pathname Parthname as identifyer
     */
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

    /**
     * TODO: Need refactor
     *
     * 
     * Helper function that normilaze the Routepath
     * @param path 
     */
    normalizeUrlPath(path: Array<string>) {
        let normPath: Array<string> = [];

        for (var i = 1; i < path.length; i++) {
            var obj = path[i];
            if (obj.length >= 1) normPath.push(obj);
        }

        return normPath;
    }
}


class FabaRuntimeWebMediator extends FabaWebMediator {
    registerCommands(): void {
        this.addCommand(ChangeMediaQueryEvent, ChangeMediaQueryCommand);
        this.addCommand(ChangeRouteEvent, ChangeRouteCommand);
        this.addCommand(ChangeUrlEvent, ChangeUrlCommand);

        this.addCommand(RenderToDOMEvent, RenderToDOMCommand);
        this.addCommand(FabaStoreUpdateEvent, StoreUpdateCommand);
        this.addCommand(LoadModuleEvent, LoadModuleCommand);
    }
}