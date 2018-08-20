import * as React from "react";
import FabaRuntimeWeb from "./FabaRuntimeWeb";


interface IRootLayoutProps {
    layout?: any;
    children?: any;
    model: any
}

export default class FabaLayout extends React.PureComponent<IRootLayoutProps> {
    render() {
        if (process.env.NODE_ENV == "development") {
            let AppContainer = require('react-hot-loader').AppContainer;
            return (
                <AppContainer>
                    <FabaRuntimeWeb.webStateContext.Provider value={this.props.model}>
                        {(this.props.layout) ? this.renderChilds() : this.props.children}
                    </FabaRuntimeWeb.webStateContext.Provider>
                </AppContainer>
            );
        } else {
            return (
                <FabaRuntimeWeb.webStateContext.Provider value={this.props.model}>
                    {(this.props.layout) ? this.renderChilds() : this.props.children}
                </FabaRuntimeWeb.webStateContext.Provider>
            )
        }
    }

    renderChilds() {
        const LA = this.props.layout;
        return <LA>{this.props.children}</LA>;
    }
}