import * as React from "react";
import shallowCompare from "react-addons-shallow-compare";

class FabaWebBaseComponent<TProps> extends React.Component<TProps, null>{
    constructor(props){
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }
}