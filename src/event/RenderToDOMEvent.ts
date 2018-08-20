import FabaEvent from "@fabalous/core/FabaEvent";

export default class RenderToDOMEvent extends FabaEvent {
    rootComponent:any;
    htmlContainer:string;
    child:any;
    route: any;

    constructor(rootComponent: any, htmlContainer: string, child?: any, route?: any) {
        super("RenderToDOMEvent");

        this.rootComponent = rootComponent;
        this.htmlContainer = htmlContainer;
        this.child = child;
        this.route = route;
    }
}