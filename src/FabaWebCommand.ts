import FabaCoreCommand from "@fabalous/core/FabaCoreCommand";
import FabaEvent from "@fabalous/core/FabaEvent";
import FabaImmutableStore from "@fabalous/core/store/FabaImmutableStore";

/**
 *
 */

export class FabaWebCommand<TStore> extends FabaCoreCommand<TStore>{
    private imstore:FabaImmutableStore<TStore>;

    /**
     *
     * @param store
     */
    constructor(store:FabaImmutableStore<TStore>){
        super(store);
        this.imstore = store;
    }

    /**
     *
     * @param path
     * @param data
     */
    setStore(path:string, data:any){
        this.imstore.set(path, data);
    }

    /**
     *
     * @returns {TStore}
     */
    get data():TStore{
        return this.imstore.data;
    }

    /**
     *
     * @param event
     */
    sendToEndpoint(event:FabaEvent){

    }

    /**
     *
     * @param mod
     * @param ev
     */
    createWorker(mod, ev){
        const worker = new mod();
        worker.postMessage(JSON.stringify(ev));

        worker.addEventListener("message", function (event) {
            console.log(event);
        });
    }
}