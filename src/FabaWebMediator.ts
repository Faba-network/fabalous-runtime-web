import FabaCoreMediator from "@fabalous/core/FabaCoreMediator";
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
        super.addCommand(event, command, check);
    }
}