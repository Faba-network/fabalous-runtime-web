import FabaStoreUpdateEvent from "@fabalous/core/event/FabaStoreUpdateEvent";
import FabaRuntimeWeb from "../FabaRuntimeWeb";
import RenderToDOMEvent from "../event/RenderToDOMEvent";
import {FabaWebCommand} from "../FabaWebCommand";

export default class StoreUpdateCommand extends FabaWebCommand<any> {
    async execute(event: FabaStoreUpdateEvent) {
        new RenderToDOMEvent(FabaRuntimeWeb.rootComponent, "container").dispatch();
    }
}