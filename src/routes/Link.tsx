import * as React from "react";

import FabaWebBaseComponent from "../FabaWebBaseComponent";
import {IRoutes} from "./IRoutes";

export interface ILinkProps{
    route:IRoutes;
}

export default class Link extends FabaWebBaseComponent<ILinkProps>{
    render(){
        return(
            <a href={this.props.route.route}>
                {this.props.children}
            </a>
        )
    }
}