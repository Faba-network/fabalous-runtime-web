import * as React from "react";
import * as ReactDOM from "react-dom";

import FabaCommand from "@fabalous/core/FabaCommand";
import RenderToDOMEvent from "../event/RenderToDOMEvent";
import FabaStore from "@fabalous/core/FabaStore";

export default class RenderToDOMCommand extends FabaCommand<FabaStore<any>> {
    execute(event: RenderToDOMEvent) {
        if (!event.child) return;

        const layout = React.createElement(event.rootComponent, {childs: event.child, model: this.store.data});
        ReactDOM.render(layout, document.getElementById(event.htmlContainer));
    }
}