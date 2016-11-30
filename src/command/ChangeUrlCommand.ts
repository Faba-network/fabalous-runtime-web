import FabaCommand from "@fabalous/core/FabaCommand";
import ChangeUrlEvent from "../event/ChangeUrlEvent";
import FabaStore from "@fabalous/core/FabaStore";

export default class ChangeUrlCommand extends FabaCommand<FabaStore<any>> {
    execute(event: ChangeUrlEvent) {

    }
}