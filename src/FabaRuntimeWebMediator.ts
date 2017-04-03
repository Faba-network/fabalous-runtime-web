import {IFabaCoreMediator} from "@fabalous/core/FabaCoreMediator";
import ChangeMediaQueryEvent from "./event/ChangeMediaQueryEvent";
import ChangeRouteEvent from "./event/ChangeRouteEvent";
import ChangeUrlEvent from "./event/ChangeUrlEvent";
import RenderToDOMEvent from "./event/RenderToDOMEvent";
import FabaStoreUpdateEvent from "@fabalous/core/event/FabaStoreUpdateEvent";
import ChangeMediaQueryCommand from "./command/ChangeMediaQueryCommand";
import ChangeRouteCommand from "./command/ChangeRouteCommand";
import ChangeUrlCommand from "./command/ChangeUrlCommand";
import RenderToDOMCommand from "./command/RenderToDOMCommand";
import StoreUpdateCommand from "./command/StoreUpdateCommand";
import {FabaWebMediator} from "./FabaWebMediator";

/**
 * FabaRuntimeWebMediator which link usefull methods
 *
 */

export default class FabaRuntimeWebMediator extends FabaWebMediator implements IFabaCoreMediator{

    /**
     * Links the Event and Commands
     * ChangeMediaQueryEvent (Event fires in Browserresizte)
     * ChangeRouteEvent (Event fires on route change)
     * ChangeUrlEvent (Event fires on url change)
     * RenderToDOMEvent (Render element to DOM)
     * FabaStoreUpdateEvent (Event fires on StoreUpdate)
     */
    registerCommands(): void {
        this.addCommand(ChangeMediaQueryEvent, ChangeMediaQueryCommand);
        this.addCommand(ChangeRouteEvent, ChangeRouteCommand);
        this.addCommand(ChangeUrlEvent, ChangeUrlCommand);
        this.addCommand(RenderToDOMEvent, RenderToDOMCommand);
        this.addCommand(FabaStoreUpdateEvent, StoreUpdateCommand);
    }
}