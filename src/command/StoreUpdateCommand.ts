import FabaStoreUpdateEvent from "@fabalous/core/FabaStoreUpdateEvent";
import FabaRuntimeWeb from "../FabaRuntimeWeb";
import RenderToDOMEvent from "../event/RenderToDOMEvent";
import {FabaWebCommand} from "../FabaWebCommand";

export default class StoreUpdateCommand extends FabaWebCommand<any> {
    async execute(event: FabaStoreUpdateEvent) {
        let k = await FabaRuntimeWeb.activeEvent.dispatch();
        new RenderToDOMEvent(FabaRuntimeWeb.rootComponent, "container", k.view).dispatch();
    }
}