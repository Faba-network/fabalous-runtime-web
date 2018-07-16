import ChangeMediaQueryEvent from "../event/ChangeMediaQueryEvent";
import {FabaWebCommand} from "../FabaWebCommand";

export default class ChangeMediaQueryCommand extends FabaWebCommand<any> {
    execute(event: ChangeMediaQueryEvent) {
        //this.store.update();
        //this.update("layout.mobile", event.mobile);
    }
}