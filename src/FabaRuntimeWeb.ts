/**
 * Created by joergwasmeier on 26.12.15.
 */

import FabaCoreRuntime from "@fabalous/core/FabaCoreRuntime";
import FabaCore from "@fabalous/core/FabaCore";
import {IRoutes} from "./routes/IRoutes";
import {FabaWebRoutes} from "./routes/FabaWebRoutes";
import LoadModuleEvent from "./event/LoadModuleEvent";
import {createHashHistory, createBrowserHistory, createMemoryHistory} from "history";
import FabaCoreTransportBase from "@fabalous/core/transport/FabaCoreTransportBase";
import FabaRuntimeWebMediator from "./FabaRuntimeWebMediator";
import FabaStore from "@fabalous/core/store/FabaStore";
import RenderToDOMEvent from "./event/RenderToDOMEvent";

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

    static history;

    private history;
    static rootComponent: any;

    listener: any;
    routes: FabaWebRoutes;

    /**
     *
     * Constructor expects an store and register the FabaRuntimeWebMediator
     * @param store FabaStore or FabaImmutableStore which is available for the commands
     * @param routes
     * @param rootComp
     * @param module
     */
    constructor(store: FabaStore<any>, routes?:any, rootComp?:any, module?:any, history:HistoryMode = HistoryMode.BROWSER) {
        super(store);

        switch (history){
            case HistoryMode.BROWSER:
                this.history = createBrowserHistory();
                break;
            case HistoryMode.HASH:
                this.history = createHashHistory();
                break;
            case HistoryMode.MEMORY:
                this.history = createMemoryHistory();
                break;
        }

        FabaRuntimeWeb.history = this.history;

        this.routes = routes;
        FabaRuntimeWeb.rootComponent = rootComp;

        FabaCore.addMediator(FabaRuntimeWebMediator);

        if (module){
            this.enableHotReload(module);
        }

        if (this.listener) this.listener();
        this.listener = this.history.listen((location) => {
            this.handleRoutes(location.pathname);
        });

        this.handleRoutes(location.pathname);
    }

    /**
     * Enable hot module reload
     * @param module
     */
    enableHotReload(module) {
        if (module && module.hot) {
            module.hot.accept();

            module.hot.dispose(() => {
                FabaCore.reset();
            });
        }
    }

    /**
     * Add's server inouts that can be used in the commands
     * @param conn Connection Object (Socket / Http.....)
     * @param name Name of the Connection
     */
    static addServerEndPoint(conn: FabaCoreTransportBase, name: string): void {
        this.servers.push({name: name, conn: conn});
    }

    /**
     * TODO: Need to be refactored and integraded in the commands
     *
     * Static function that send an event to an ENDPOINT (Obsulute)
     * @param event Any FabaEvent object
     * @param identifyer Identifyer of the Endpoint that should be used
     */
    static sendToEndpoint(event: any, identifyer: string): void {
        if (this.servers.length == 0) {
            throw new Error("NO ENDPOINT DEFINED");
        }

        for (var i = 0; i < this.servers.length; i++) {
            this.servers[i].conn.send(event);
        }
    }

    /**
     * Handle the routes it hey change
     * @param pathname Pathname as identifyer
     */
    handleRoutes(pathname?: string) {
        if (!this.routes){
          console.log("Routes is empty use 3rd party routes lib?");
          console.log("Render rootcomponent");

          new RenderToDOMEvent(FabaRuntimeWeb.rootComponent, "container").dispatch();
          return;
        }

        if (!pathname) pathname = "";

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
            if (process.env.FABALOUS_DEBUG > 2) console.log("Load Route Index");
            new LoadModuleEvent(matches[0].module, this.normalizeUrlPath(path)).dispatch();
        } else {
            if (process.env.FABALOUS_DEBUG > 2) console.log(`Load Route $path`);
            new LoadModuleEvent(this.routes.getRoutes()[0].module, this.normalizeUrlPath(path)).dispatch();
        }
    }

    /**
     * TODO: Need refactor
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

export enum HistoryMode{
    HASH,
    BROWSER,
    MEMORY
}