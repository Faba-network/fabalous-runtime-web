import FabaCoreMediator from "@fabalous/core/FabaCoreMediator";
import FabaEvent from "@fabalous/core/FabaEvent";
import {FabaWebCommand} from "./FabaWebCommand";
/**
 * Created by creativecode on 02.01.17.
 */
export class FabaWebMediator extends FabaCoreMediator{
    addCommand(event, command: typeof FabaWebCommand): void {
        super.addCommand(event, command);
    }
}