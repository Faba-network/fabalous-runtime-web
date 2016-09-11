import * as React from "react";
import * as ReactDOM from "react-dom";
import {Router, browserHistory, hashHistory} from "react-router";
import FabaCore from "@fabalous/core/lib/FabaCore";

function loadRoute(cb) {
  return (module) => cb(null, module.default);
}

function loadRouteDash(cb, view?:string) {
  return (module) => {
    FabaCore.addMediator(module.mediator);

    new module.initEvent(view).dispatch((event)=>{
      cb(null, ()=>{return event.view});
    });

  }
}

function errorLoading(e) {
  throw e;
}

export

/*
 {
 path: '/course/',
 getComponent(location, cb) {
 System.import('./../course/index').then(loadRouteDash(cb)).catch(errorLoading);
 }
 },
 {
 path: '/courses-overview/',
 getComponent(location, cb) {
 System.import('./../courses-overview/index').then(loadRouteDash(cb)).catch(errorLoading);
 }
 },

 */