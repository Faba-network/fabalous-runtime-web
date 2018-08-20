import * as React from "react";
import FabaRuntimeWeb from '../FabaRuntimeWeb';

export function connect<T, U>(mapper: (st: U) => T, Component) {
    return function ConnectedComponent(props) {
        return (
            <FabaRuntimeWeb.webStateContext.Consumer>
                {
                    // @ts-ignore
                    state => <Component {...props} {...mapper(state)}/>
                }
            </FabaRuntimeWeb.webStateContext.Consumer>
        );
    }
}