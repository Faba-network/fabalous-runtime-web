import FabaMediator from "@fabalous/core/FabaMediator";
import {IFabaMediator} from "@fabalous/core/IFabaMediator";
import {CLIENT} from "@fabalous/core/FabaCore";

export default class FabaRuntimeWebMediator extends  FabaMediator implements IFabaMediator{
    registerCommands(): void {
        if (CLIENT){

            this.addCommand(require("./event/ChangeMediaQueryEvent"), require("./command/ChangeMediaQueryCommand"));
            this.addCommand(require("./event/ChangeRouteEvent"), require("./command/ChangeRouteCommand"));
            this.addCommand(require("./event/ChangeUrlEvent"), require("./command/ChangeUrlCommand"));
            this.addCommand(require("./event/RenderToDOMEvent"), require("./command/RenderToDOMCommand"));

            this.addCommand(require("@fabalous/core/FabaStoreUpdateEvent"), require("./command/RenderToDOMCommand"));

            super.registerCommands();
        }
    }
}