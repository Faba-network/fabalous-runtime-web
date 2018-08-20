import LoadModuleEvent from "../event/LoadModuleEvent";
import FabaRuntimeWeb from "../FabaRuntimeWeb";
import RenderToDOMEvent from "../event/RenderToDOMEvent";
import FabaCore from "@fabalous/core/FabaCore";
import {FabaWebCommand} from "../FabaWebCommand";

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
        /*
        let t: any = new comp.initEvent;
        t.route = event.route;
        t.args = event.route.args;
        t.init = true;
        t.update = false;*
        */

        //FabaRuntimeWeb.activeEvent = t;
        //let k = await t.dispatch();

        new RenderToDOMEvent(FabaRuntimeWeb.rootComponent, "container", comp.view).dispatch();
    }
}