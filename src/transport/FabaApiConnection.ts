import {FabaEventResultType} from "@fabalous/core/FabaEvent";
import FabaEvent from "@fabalous/core/FabaEvent";
import FabaCoreTransportBase from "@fabalous/core/transport/FabaCoreTransportBase";

export default class FabaApiConnection extends FabaCoreTransportBase {
  /**
   *
   */
  private url:string;

  /**
   *
   */
  private sendEventList:Array<FabaEvent>;

  /**
   *
   * @param url
   */
  constructor(url) {
    super();
    this.url = url;
    this.sendEventList = [];
  }

  /**
   *
   * @param data
   * @param event
   */
  private completeHandler(data:any,event:FabaEvent):void {
    let assign = require('object.assign').getPolyfill();

    let jsonString:string = data.target.response;
    let json = JSON.parse(jsonString);

    let h:any = assign(event, json);

    event.dispatch(null, FabaEventResultType.RESULT);
  }

  /**
   *
   * @param event
   * @param timeoutTime
   * @param timeOut
   * @param compress
   */
  // TODO BUG
  public send(event:FabaEvent, timeoutTime:number = 5000, timeOut:boolean = true, compress:boolean = true) {
    //this.sendEventList.push(event);
    //event.callBack();
    var nRequest:XMLHttpRequest = new XMLHttpRequest();
    nRequest.addEventListener("load", (data)=>{
      this.completeHandler(data,event);
    }, false);

    nRequest.addEventListener("abort", ()=>{
      console.log("error");
    }, false);
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