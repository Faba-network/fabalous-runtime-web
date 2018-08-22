/**
 * Created by joergwasmeier on 26.12.15.
 */

import FabaCoreRuntime from "@fabalous/core/FabaCoreRuntime";
import FabaCore from "@fabalous/core/FabaCore";
import {IRoutes} from "./routes/IRoutes";
import {FabaWebRoutes} from "./routes/FabaWebRoutes";
import LoadModuleEvent from "./event/LoadModuleEvent";
import {createBrowserHistory, createHashHistory, createMemoryHistory} from "history";
import FabaCoreTransportBase from "@fabalous/core/transport/FabaCoreTransportBase";
import FabaRuntimeWebMediator from "./FabaRuntimeWebMediator";
import FabaStore from "@fabalous/core/store/FabaStore";
import RenderToDOMEvent from "./event/RenderToDOMEvent";
import {mapUrlToRoute} from "./routes/handleRoutes";
import * as React from "react";

/**
 * Runtime class and startpoint for web Project's
 *
 * Extend this class with your own logic.
 *
 * Need an store (FabaStore or FabaImmutableStore) as argument
 */
export default class FabaRuntimeWeb extends FabaCoreRuntime {
    static servers: Array<any> = [];
    static activeEvent: any;
    static activeRoute: IRoutes;

    static hydrate:boolean = false;
    static jest: boolean = false;

    static containers: Array<any>;

    static history;
    static webStateContext: React.Context<FabaStore<any>>;

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
    constructor(store: FabaStore<any>, routes?:any, rootComp?:any, module?:any, history:HistoryMode = HistoryMode.BROWSER, initHandleRoutes:boolean = true) {
        super(store);
        FabaRuntimeWeb.webStateContext = React.createContext(store);

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
        if (rootComp) {
            FabaRuntimeWeb.rootComponent = rootComp;
        }

        FabaCore.addMediator(FabaRuntimeWebMediator);

        if (module){
            this.enableHotReload(module);
        }

        if (this.listener) this.listener();
        this.listener = this.history.listen((location) => {
            this.handleRoutes(location.pathname);
        });

        if (initHandleRoutes) this.handleRoutes(location.pathname);
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
     * Handle the routes if they change
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
        const foundRoute = mapUrlToRoute(pathname, this.routes);

        if (process.env.FABALOUS_DEBUG > "2") console.log(`Load Route $path`);
        new LoadModuleEvent(foundRoute).dispatch();
    }
}

export enum HistoryMode{
    HASH,
    BROWSER,
    MEMORY
}