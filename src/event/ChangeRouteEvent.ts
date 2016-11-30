import FabaEvent from "@fabalous/core/FabaEvent";

export default class ChangeRouteEvent extends FabaEvent {
    constructor() {
        super("ChangeRouteEvent");
    }
}