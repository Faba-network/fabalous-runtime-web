import ChangeRouteEvent from "../event/ChangeRouteEvent";
import {FabaWebCommand} from "../FabaWebCommand";

export default class ChangeRouteCommand extends FabaWebCommand<any> {
    execute(event: ChangeRouteEvent) {
        //this.store.set("route", event.route);
    }
}