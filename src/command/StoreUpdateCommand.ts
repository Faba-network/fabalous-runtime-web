import FabaStoreUpdateEvent from "@fabalous/core/event/FabaStoreUpdateEvent";
import FabaRuntimeWeb from "../FabaRuntimeWeb";
import RenderToDOMEvent from "../event/RenderToDOMEvent";
import {FabaWebCommand} from "../FabaWebCommand";

export default class StoreUpdateCommand extends FabaWebCommand<any> {
    async execute(event: FabaStoreUpdateEvent) {
        if (FabaRuntimeWeb.activeEvent){
            const event = FabaRuntimeWeb.activeEvent;
            event.init = false;
            event.update = true;
            let k = await event.dispatch();
            new RenderToDOMEvent(FabaRuntimeWeb.rootComponent, "container", k.view).dispatch();
        }
    }
}