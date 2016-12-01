import FabaCommand from "@fabalous/core/FabaCommand";
import FabaStore from "@fabalous/core/FabaStore";
import LoadModuleEvent from "../event/LoadModuleEvent";
import FabaRuntimeWeb from "../FabaRuntimeWeb";
import RenderToDOMEvent from "../event/RenderToDOMEvent";
import FabaCore from "@fabalous/core/FabaCore";

export default class LoadModuleCommand extends FabaCommand<FabaStore<any>> {
    async execute(event: LoadModuleEvent) {
        if (!event.loadfun) return;

        FabaRuntimeWeb.activeModule = event.loadfun;
        FabaRuntimeWeb.activeArgs = event.args;

        let comp = await event.loadfun();
        FabaCore.addMediator(comp.mediator);

        let t: any = new comp.initEvent;
        t.args = event.args;

        FabaRuntimeWeb.activeEvent = t;
        let k = await t.dispatch();
        new RenderToDOMEvent(FabaRuntimeWeb.rootComponent, "container", k.view);
    }
}