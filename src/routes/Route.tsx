import * as React from "react";
import {IRoutes} from "./IRoutes";
import {connectRoute} from "../utils/connect";

interface ConnectedProps {
    activeRoute?: string
}

interface IProps {
    route: IRoutes,
    component: any
}

type Props = IProps & ConnectedProps;

class Route extends React.PureComponent<Props> {
    render() {
        return (this.props.route.route === this.props.activeRoute) ? this.props.component : null;
    }
}

const mapStateToProps = (route: IRoutes): ConnectedProps => {
    return {
        activeRoute: route.route
    }
};

export default connectRoute(mapStateToProps)(Route);