import FabaEvent from "@fabalous/core/FabaEvent";

export default class RenderToDOMEvent extends FabaEvent {
    rootComponent:any;
    htmlContainer:string;
    child:any;

    constructor(rootComponent:any, htmlContainer:string, child?:any) {
        super("RenderToDOMEvent");

        this.rootComponent = rootComponent;
        this.htmlContainer = htmlContainer;
        this.child = child;
    }
}