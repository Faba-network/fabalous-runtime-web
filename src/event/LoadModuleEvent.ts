import FabaEvent from "@fabalous/core/FabaEvent";
import {IRoutes} from "../routes/IRoutes";

export default class LoadModuleEvent extends FabaEvent {
    route: IRoutes;

    constructor(route: IRoutes) {
        super("LoadModuleEvent");

        this.route = route;
    }
}