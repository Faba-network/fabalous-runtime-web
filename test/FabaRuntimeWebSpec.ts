import FabaRuntimeWeb from "../src/FabaRuntimeWeb";
import FabaImmutableStore from "@fabalous/core/store/FabaImmutableStore";
import FabaCore from "@fabalous/core/FabaCore";
import FabaRuntimeWebMediator from "../src/FabaRuntimeWebMediator";
import FabaEvent from "@fabalous/core/FabaEvent";
import {FabaWebCommand} from "../src/FabaWebCommand";

class TestEvent extends FabaEvent{
    constructor(){
        super("TestEvent");
    }
}

class TestStoreChangeEvent extends FabaEvent{
    constructor(){
        super("TestEvent");
    }
}

class TestCommand extends FabaWebCommand<any>{
    execute(event:TestEvent){
        console.log("TestEvent");
        event.callBack();
    }
}

class TestStoreChangeCommand extends FabaWebCommand<Store>{
    execute(event:TestStoreChangeEvent){
        super.setStore("test", true);
        event.callBack();
    }
}

class TestMediator extends FabaRuntimeWebMediator{
    registerCommands(): void {
        this.addCommand(TestEvent, TestCommand);
        this.addCommand(TestStoreChangeEvent, TestStoreChangeCommand);
    }
}

class Store{
    test:boolean = false;
}

describe("FabaRuntimeWebTest", ()=>{
    it("Runtime should be exist", ()=>{
        let store = new FabaImmutableStore<Store>(new Store());
        let runtime = new FabaRuntimeWeb(store);
        expect(runtime).toBeDefined();
    });

    it("Testevent should be called", (done)=>{
        let store = new FabaImmutableStore<any>({});
        let runtime = new FabaRuntimeWeb(store);
        FabaCore.addMediator(TestMediator);

        new TestEvent().dispatch().then((e)=>{
            done();
        });
    });

    it("Store should be changed", (done)=>{
        let store = new FabaImmutableStore<Store>(new Store());
        let runtime = new FabaRuntimeWeb(store);
        FabaCore.addMediator(TestMediator);

        new TestStoreChangeEvent().dispatch().then((e)=>{
            setTimeout(()=> {
                done();
            }, 2000);
        });
    })
});