import * as React from "react";
import FabaRuntimeWeb from '../FabaRuntimeWeb';
import {RoutesContext} from '../routes/FabaWebRoutes';

export const connect =
    (mapContextToProps) =>
        (Component) => {
            const WrappedContextComponent = (props) => (
                <FabaRuntimeWeb.webStateContext.Consumer>
                    {context => (
                        <Component
                            {...mapContextToProps(context)}
                            {...props}
                        />
                    )
                    }
                </FabaRuntimeWeb.webStateContext.Consumer>
            );

            const componentName = Component.displayName || Component.name;
            const wrapperName = `Context (${componentName})`;
            //@ts-ignore
            WrappedContextComponent.displayName = wrapperName;

            return WrappedContextComponent;
        };

export const connectWithRoute =
    (mapContextToProps) =>
        (Component) => {
            const WrappedContextComponent = (props) => (
                <FabaRuntimeWeb.webStateContext.Consumer>
                    {context => (
                        <RoutesContext.Consumer>
                            {route => (
                                <Component
                                    {...mapContextToProps(context, route)}
                                    {...props}
                                />
                            )}
                        </RoutesContext.Consumer>
                    )
                    }
                </FabaRuntimeWeb.webStateContext.Consumer>
            );

            const componentName = Component.displayName || Component.name;
            const wrapperName = `Context (${componentName})`;
            //@ts-ignore
            WrappedContextComponent.displayName = wrapperName;

            return WrappedContextComponent;
        };

export const connectRoute =
    (mapContextToProps) =>
        (Component) => {
            const WrappedContextComponent = (props) => (
                <RoutesContext.Consumer>
                    {route => (
                        <Component
                            {...mapContextToProps(route)}
                            {...props}
                        />
                    )}
                </RoutesContext.Consumer>
            );

            const componentName = Component.displayName || Component.name;
            const wrapperName = `Context (${componentName})`;
            //@ts-ignore
            WrappedContextComponent.displayName = wrapperName;

            return WrappedContextComponent;
        };