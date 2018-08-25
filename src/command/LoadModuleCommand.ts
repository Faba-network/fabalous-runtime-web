import LoadModuleEvent from "../event/LoadModuleEvent";
import FabaRuntimeWeb from "../FabaRuntimeWeb";
import RenderToDOMEvent from "../event/RenderToDOMEvent";
import FabaCore from "@fabalous/core/FabaCore";
import {FabaWebCommand} from "../FabaWebCommand";
import * as React from "react";

export default class LoadModuleCommand extends FabaWebCommand<any> {
    async execute(event: LoadModuleEvent) {
        if (!event.route.module) return;
        FabaRuntimeWeb.activeRoute = event.route;

        let comp = await event.route.module();
        comp = comp.default;

        if (!comp) {
            console.error("Module not Found", event.route);
            return;
        }

        //@ts-ignore
        FabaCore.addMediator(comp.mediator, event.route.route);

        new RenderToDOMEvent(FabaRuntimeWeb.rootComponent, "container", React.createElement(comp.view), event.route).dispatch();
    }
}