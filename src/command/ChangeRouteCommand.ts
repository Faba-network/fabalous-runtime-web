import FabaCommand from "@fabalous/core/FabaCommand";
import ChangeRouteEvent from "../event/ChangeRouteEvent";
import FabaStore from "@fabalous/core/FabaStore";

export default class ChangeRouteCommand extends FabaCommand<FabaStore<any>> {
    execute(event: ChangeRouteEvent) {
        //this.store.set("route", event.route);
    }
}