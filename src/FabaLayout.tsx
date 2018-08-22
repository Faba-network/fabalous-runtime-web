import * as React from "react";
import FabaRuntimeWeb from "./FabaRuntimeWeb";
import {RoutesContext} from "./routes/FabaWebRoutes";


interface IRootLayoutProps {
    layout?: any;
    children?: any;
    model: any
    route: any;
}

export default class FabaLayout extends React.PureComponent<IRootLayoutProps> {
    render() {
        if (process.env.NODE_ENV == "hot-loader-dev") {
            let AppContainer = require('react-hot-loader').AppContainer;
            return (
                <AppContainer>
                    <FabaRuntimeWeb.webStateContext.Provider value={this.props.model}>
                        <RoutesContext.Provider value={this.props.route}>
                            {(this.props.layout) ? this.renderChilds() : this.props.children}
                        </RoutesContext.Provider>
                    </FabaRuntimeWeb.webStateContext.Provider>
                </AppContainer>
            );
        } else {
            return (
                <FabaRuntimeWeb.webStateContext.Provider value={this.props.model}>
                    <RoutesContext.Provider value={this.props.route}>
                        {(this.props.layout) ? this.renderChilds() : this.props.children}
                    </RoutesContext.Provider>
                </FabaRuntimeWeb.webStateContext.Provider>
            )
        }
    }

    renderChilds() {
        const LA = this.props.layout;
        return <LA>{this.props.children}</LA>;
    }
}