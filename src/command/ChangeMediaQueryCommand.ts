import ChangeMediaQueryEvent from "../event/ChangeMediaQueryEvent";
import {FabaWebCommand} from "../FabaWebCommand";

export default class ChangeMediaQueryCommand extends FabaWebCommand<any> {
    execute(event: ChangeMediaQueryEvent) {
        this.setStore("layout.landscape", event.landscape);
        this.setStore("layout.mobile", event.mobile);
    }
}