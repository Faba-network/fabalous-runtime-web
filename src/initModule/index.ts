/**
 * Created by creativecode on 06.01.17.
 */
import FabaEvent from "@fabalous/core/FabaEvent";
import {FabaWebCommand} from "../FabaWebCommand";
import {FabaWebMediator} from "../FabaWebMediator";


class InitModuleMediator extends FabaWebMediator{
    registerCommands(){
        super.addCommand(InitModuleEvent, InitModuleCommand)
    }
}

class InitModuleEvent extends FabaEvent{
    constructor(){
        super("InitModuleEvent");
    }
}

class InitModuleCommand extends FabaWebCommand<{}>{
    execute(eve:InitModuleEvent){
        eve.callBack();
    }
}

module.exports = {
    mediator: InitModuleMediator,
    initEvent: InitModuleEvent,
};