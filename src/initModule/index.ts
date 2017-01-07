///<reference path="../../node_modules/@types/react/index.d.ts"/>
/**
 * Created by creativecode on 06.01.17.
 */
import FabaEvent from "@fabalous/core/FabaEvent";
import {FabaWebCommand} from "../FabaWebCommand";
import {FabaWebMediator} from "../FabaWebMediator";
import InitModuleView from "./InitModuleView";

import * as React from "react";

class InitModuleMediator extends FabaWebMediator{
    registerCommands(){
        super.addCommand(InitModuleEvent, InitModuleCommand)
    }
}

class InitModuleEvent extends FabaEvent{
    view:any;

    constructor(){
        super("InitModuleEvent");
    }
}

class InitModuleCommand extends FabaWebCommand<{}>{
    execute(eve:InitModuleEvent){
        eve.view = React.createElement(InitModuleView, null);
        eve.callBack();
    }
}

module.exports = {
    mediator: InitModuleMediator,
    initEvent: InitModuleEvent,
};