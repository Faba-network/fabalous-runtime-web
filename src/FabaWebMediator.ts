import FabaCoreMediator from "@fabalous/core/FabaCoreMediator";
import FabaEvent from "@fabalous/core/FabaEvent";
import {FabaWebCommand} from "./FabaWebCommand";
/**
 * Created by creativecode on 02.01.17.
 */
export class FabaWebMediator extends FabaCoreMediator{
    /**
     *
     * @param event
     * @param command
     * @param check
     */
    addCommand(event, command, check?): void {
        if (check && !check()) return;

        super.addCommand(event, command);
    }
}