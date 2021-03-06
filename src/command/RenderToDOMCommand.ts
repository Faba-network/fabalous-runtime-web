import * as React from "react";
import * as ReactDOM from "react-dom";

import RenderToDOMEvent from "../event/RenderToDOMEvent";
import {FabaWebCommand} from "../FabaWebCommand";

export default class RenderToDOMCommand extends FabaWebCommand<any> {
    execute(event: RenderToDOMEvent) {
        if (!event.child) return;

        const layout = React.createElement(event.rootComponent, {childs: event.child, model: this.data});
        ReactDOM.render(layout, document.getElementById(event.htmlContainer));
    }
}