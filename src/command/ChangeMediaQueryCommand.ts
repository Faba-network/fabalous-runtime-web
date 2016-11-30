import ChangeMediaQueryEvent from "../event/ChangeMediaQueryEvent";
import FabaCommand from "@fabalous/core/FabaCommand";
import FabaStore from "@fabalous/core/FabaStore";

export default class ChangeMediaQueryCommand extends FabaCommand<FabaStore<any>> {
    execute(event: ChangeMediaQueryEvent) {
        this.store.set("layout.landscape", event.landscape);
        this.store.set("layout.mobile", event.mobile);
    }
}