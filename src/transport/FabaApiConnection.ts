import FabaTransportBase from "@fabalous/core/transport/FabaTransportBase";
import FabaEvent from "@fabalous/core/FabaEvent";

/**
 * Created by creativecode on 25.12.15.
 */

declare var require;
export default class FabaApiConnection extends FabaTransportBase {
  private url:string;

  private sendEventList:Array<FabaEvent>;

  constructor(url) {
    super();
    this.url = url;
    this.sendEventList = [];
  }

  private completeHandler(data:any):void {
    let assign = require('object.assign').getPolyfill();

    let jsonString:string = data.target.response;
    let json = JSON.parse(jsonString);

    let currentEvent = this.sendEventList[0];
    let h:any = assign(currentEvent, json);

    h.dispatch(null, true);
  }

  public send(event:FabaEvent, timeoutTime:number = 5000, timeOut:boolean = true, compress:boolean = true) {
    this.sendEventList.push(event);

    var nRequest:XMLHttpRequest = new XMLHttpRequest();
    nRequest.addEventListener("load", this.completeHandler.bind(this), false);
    nRequest.open("POST", this.url, true);
    //nRequest.setRequestHeader('Content-Type', 'text/plain');
    nRequest.send(super.prepareEventToSend(event));

    //var sessionId = (CoreModel.instance.user != null) ? CoreModel.instance.user.sessionId : null;

    //if (CoreWebAppModel.instance.mobile == true)
    //compress = false;

    //var nRequest = new SynapseXmlRequest(evnid, this.url, prepareSendData(event, compress), timeOut, sessionId);
    //nRequest.addEventListener(SynapseXmlRequest.LOAD_EVENT, completeHandler);
    //nRequest.addEventListener(SynapseXmlRequest.TIMEOUT_EVENT, timeOutHandler);
    //nRequest.addEventListener(SynapseXmlRequest.TIMEOUT_EVENT, timeOutHandler);

    //return nRequest;
  }
}