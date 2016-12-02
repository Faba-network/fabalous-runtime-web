import FabaCommand from "@fabalous/core/FabaCommand";
import FabaStoreUpdateEvent from "@fabalous/core/FabaStoreUpdateEvent";
import FabaStore from "@fabalous/core/FabaStore";
import FabaRuntimeWeb from "../FabaRuntimeWeb";
import RenderToDOMEvent from "../event/RenderToDOMEvent";

export default class StoreUpdateCommand extends FabaCommand<FabaStore<any>> {
    async execute(event: FabaStoreUpdateEvent) {
        let k = await FabaRuntimeWeb.activeEvent.dispatch();
        new RenderToDOMEvent(FabaRuntimeWeb.rootComponent, "container", k.view).dispatch();
    }
}