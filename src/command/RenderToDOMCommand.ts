import * as React from "react";
import * as ReactDOM from "react-dom";

import RenderToDOMEvent from "../event/RenderToDOMEvent";
import {FabaWebCommand} from "../FabaWebCommand";
import FabaRuntimeWeb from "../FabaRuntimeWeb";
import FabaLayout from "../FabaLayout";
import {IRoutes} from "../routes/IRoutes";

let lay: any;
let child: any;
let route: Partial<IRoutes>;

export default class RenderToDOMCommand extends FabaWebCommand<any> {
    execute(event: RenderToDOMEvent) {
        if (event.child) child = event.child;
        if (event.route) route = {route: event.route.route, args: event.route.args};

        if (!lay)
            lay = React.createElement(FabaLayout, {
                model: this.data,
                layout: FabaRuntimeWeb.rootComponent,
                route
            }, child);
        else
            lay = React.cloneElement(lay, {model: this.data, layout: FabaRuntimeWeb.rootComponent, route}, child);

        if (FabaRuntimeWeb.hydrate) {
            ReactDOM.hydrate(lay, document.getElementById(event.htmlContainer));
        } else if (FabaRuntimeWeb.jest) {

        } else {
            ReactDOM.render(lay, document.getElementById(event.htmlContainer));
        }
    }
}