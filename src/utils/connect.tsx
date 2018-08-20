import * as React from "react";
import FabaRuntimeWeb from '../FabaRuntimeWeb';
import {RoutesContext} from '../routes/FabaWebRoutes';
import {IRoutes} from "../routes/IRoutes";

export function connect<T, U>(mapper: (st: U) => T, Component) {
    return function ConnectedComponent(props) {
        return (
            <FabaRuntimeWeb.webStateContext.Consumer>
                {
                    state =>
                        // @ts-ignore
                        <Component {...props} {...mapper(state)}/>
                }
            </FabaRuntimeWeb.webStateContext.Consumer>
        );
    }
}


export function connectWithRoute<T, U>(mapper: (st: U, route: IRoutes) => T, Component) {
    return function ConnectedComponent(props) {
        return (
            <FabaRuntimeWeb.webStateContext.Consumer>
                {
                    state => <RoutesContext.Consumer>{
                        // @ts-ignore
                        route => <Component {...props} {...mapper(state, route)}/>
                    }
                    </RoutesContext.Consumer>
                }
            </FabaRuntimeWeb.webStateContext.Consumer>
        );
    }
}

export function connectRoute<T>(mapper: (route: IRoutes) => T, Component) {
    return function ConnectedComponent(props) {
        return (
            <RoutesContext.Consumer>{
                // @ts-ignore
                route => <Component {...props} {...mapper(route)}/>
            }
            </RoutesContext.Consumer>

        );
    }
}