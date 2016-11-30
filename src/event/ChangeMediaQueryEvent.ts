import FabaEvent from "@fabalous/core/FabaEvent";

export default class ChangeMediaQueryEvent extends FabaEvent {
    landscape: boolean;
    mobile: boolean;

    constructor(landscape: boolean, mobile: boolean) {
        super("ChangeMediaQueryEvent");

        this.landscape = landscape;
        this.mobile = mobile;
    }
}