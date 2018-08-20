import * as React from "react";
import * as ReactDOM from "react-dom";

import RenderToDOMEvent from "../event/RenderToDOMEvent";
import {FabaWebCommand} from "../FabaWebCommand";
import FabaRuntimeWeb from "../FabaRuntimeWeb";
import FabaLayout from "../FabaLayout";

let lay: any;
let child: any;

export default class RenderToDOMCommand extends FabaWebCommand<any> {
    execute(event: RenderToDOMEvent) {
        if (event.child) child = event.child;

        if (!lay)
            lay = React.createElement(FabaLayout, {model: this.data, layout: FabaRuntimeWeb.rootComponent}, child);
        else
            lay = React.cloneElement(lay, {model: this.data, layout: FabaRuntimeWeb.rootComponent}, child);

        if (FabaRuntimeWeb.hydrate) {
            ReactDOM.hydrate(lay, document.getElementById(event.htmlContainer));
        } else {
            ReactDOM.render(lay, document.getElementById(event.htmlContainer));
        }
    }
}