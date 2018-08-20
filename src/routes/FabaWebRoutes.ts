import {IRoutes} from "./IRoutes";
import * as React from "react";

export class FabaWebRoutes {
    /**
     *
     * @returns {[{route: string, module: {}}]}
     */
    getRoutes(): Array<IRoutes> {
        return [{route: "", module: {}}]
    }
}

export const RoutesContext = React.createContext({activeRoute: null});