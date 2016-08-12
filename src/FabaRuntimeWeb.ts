/**
 * Created by joergwasmeier on 26.12.15.
 */

import FabaCore from "fabalous-core/core/FabaCore";
import FabaTransportBase from "fabalous-core/transport/FabaTransportBase";

export default class FabaRuntimeWeb extends FabaCore {
    static servers:Array<any> = [];

    constructor(){
        super();
    }

    static addServerEndPoint(conn:FabaTransportBase, name:string){
        this.servers.push({name:name, conn:conn});
    }

    static sendToEndpoint(event:any, identifyer:string){
        if (this.servers.length == 0){
            throw new Error("NO ENDPOINT DEFINED");
        }

        for (var i = 0; i < this.servers.length; i++) {
            this.servers[i].conn.send(event);
        }
    }
}