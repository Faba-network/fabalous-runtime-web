import LoadModuleEvent from "../event/LoadModuleEvent";
import FabaRuntimeWeb from "../FabaRuntimeWeb";
import RenderToDOMEvent from "../event/RenderToDOMEvent";
import FabaCore from "@fabalous/core/FabaCore";
import {FabaWebCommand} from "../FabaWebCommand";

export default class LoadModuleCommand extends FabaWebCommand<any> {
    async execute(event: LoadModuleEvent) {
        if (!event.loadfun) return;

        FabaRuntimeWeb.activeModule = event.loadfun;
        FabaRuntimeWeb.activeArgs = event.args;

        let comp = await event.loadfun();
        comp = comp.default;

        if (!comp){
            console.error("Module not Found", event.args, event.loadfun);
            return;
        }

        FabaCore.addMediator(comp.mediator);

        let t: any = new comp.initEvent;
        t.args = event.args;

        FabaRuntimeWeb.activeEvent = t;
        let k = await t.dispatch();
        new RenderToDOMEvent(FabaRuntimeWeb.rootComponent, "container", k.view).dispatch();
    }
}