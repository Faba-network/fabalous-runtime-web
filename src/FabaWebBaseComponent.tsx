import * as React from "react";
const shallowCompare = require('react-addons-shallow-compare');

export default class FabaWebBaseComponent<TProps> extends React.Component<TProps, null>{
    constructor(props:TProps){
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }
}