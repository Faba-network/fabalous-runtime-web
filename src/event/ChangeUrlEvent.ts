import FabaEvent from "@fabalous/core/FabaEvent";

export default class ChangeUrlEvent extends FabaEvent {
    constructor() {
        super("ChangeUrlEvent");
    }
}