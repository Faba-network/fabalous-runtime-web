import * as React from "react";

import {IRoutes} from "./IRoutes";

export interface Props {
    route: IRoutes;
}

export default class Link extends React.PureComponent<Props> {
    render() {
        return (
            <a href={this.props.route.route}>
                {this.props.children}
            </a>
        )
    }
}