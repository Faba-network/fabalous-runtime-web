import FabaEvent from "@fabalous/core/FabaEvent";

export default class LoadModuleEvent extends FabaEvent {
    loadfun:any;
    args:any;

    constructor(loadfun: any, args?: Array<string>) {
        super("LoadModuleEvent");

        this.loadfun = loadfun;
        this.args = args;
    }
}