import FabaMediator from "@fabalous/core/FabaMediator";
import {IFabaMediator} from "@fabalous/core/IFabaMediator";


/**
 * FabaRuntimeWebMediator which link usefull methods
 * 

 */
export default class FabaRuntimeWebMediator extends  FabaMediator implements IFabaMediator{

    /**
     * Links the Event and Commands
     * ChangeMediaQueryEvent (Event fires in Browserresizte)
     * ChangeRouteEvent (Event fires on route change)
     * ChangeUrlEvent (Event fires on url change)
     * RenderToDOMEvent (Render element to DOM)
     * FabaStoreUpdateEvent (Event fires on StoreUpdate)
     */
    registerCommands(): void {
        if (CLIENT){
            this.addCommand(require("./event/ChangeMediaQueryEvent"), require("./command/ChangeMediaQueryCommand"));
            this.addCommand(require("./event/ChangeRouteEvent"), require("./command/ChangeRouteCommand"));
            this.addCommand(require("./event/ChangeUrlEvent"), require("./command/ChangeUrlCommand"));
            this.addCommand(require("./event/RenderToDOMEvent"), require("./command/RenderToDOMCommand"));

            this.addCommand(require("@fabalous/core/FabaStoreUpdateEvent"), require("./command/StoreUpdateCommand"));

            super.registerCommands();
        }
    }
}