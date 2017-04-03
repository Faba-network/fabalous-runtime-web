import FabaEvent from "@fabalous/core/FabaEvent";
import {FabaWebCommand} from "../FabaWebCommand";
import {FabaWebMediator} from "../FabaWebMediator";
import InitModuleView from "./InitModuleView";

import * as React from "react";

class InitModuleMediator extends FabaWebMediator{
    /**
     *
     */
    registerCommands(){
        super.addCommand(InitModuleEvent, InitModuleCommand)
    }
}

class InitModuleEvent extends FabaEvent{
    view:any;

    /**
     *
     */
    constructor(){
        super("InitModuleEvent");
    }
}

class InitModuleCommand extends FabaWebCommand<{}>{
    /**
     *
     * @param eve
     */
    execute(eve:InitModuleEvent){
        eve.view = React.createElement(InitModuleView, null);
        eve.callBack();
    }
}
const def:any = {
    mediator: InitModuleMediator,
    initEvent: InitModuleEvent,
};

export default def;