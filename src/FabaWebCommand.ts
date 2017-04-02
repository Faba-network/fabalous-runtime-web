import FabaCoreCommand from "@fabalous/core/FabaCoreCommand";
import FabaEvent from "@fabalous/core/FabaEvent";
import FabaImmutableStore from "@fabalous/core/store/FabaImmutableStore";
/**
 * Created by creativecode on 02.01.17.
 */
export class FabaWebCommand<TStore> extends FabaCoreCommand<TStore>{
    private imstore:FabaImmutableStore<TStore>;

    constructor(store:FabaImmutableStore<TStore>){
        super(store);
        this.imstore = store;
    }

    setStore(path:string, data:any){
        this.imstore.set(path, data);
    }

    get data():TStore{
        return this.imstore.data;
    }

    sendToEndpoint(event:FabaEvent){

    }

    createWorker(mod, ev){
        const worker = new mod();
        worker.postMessage(JSON.stringify(ev));

        worker.addEventListener("message", function (event) {
            console.log(event);
        });
    }
}