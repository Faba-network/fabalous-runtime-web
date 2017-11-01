import * as React from "react";
import * as ReactDOM from "react-dom";

import RenderToDOMEvent from "../event/RenderToDOMEvent";
import {FabaWebCommand} from "../FabaWebCommand";
import FabaRuntimeWeb from "../FabaRuntimeWeb";

export default class RenderToDOMCommand extends FabaWebCommand<any> {
    execute(event: RenderToDOMEvent) {
        const layout = React.createElement(event.rootComponent, {childs: event.child,  model: this.data});
        if (FabaRuntimeWeb.hydrate){
            ReactDOM.hydrate(layout, document.getElementById(event.htmlContainer));
        } else {
            ReactDOM.render(layout, document.getElementById(event.htmlContainer));
        }
    }
}