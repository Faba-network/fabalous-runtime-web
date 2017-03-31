import * as React from "react";
const shallowCompare = require('react-addons-shallow-compare');

/**
 * Faba BaseComponent that use shallowCompare for quick rendering if it neeeds to
 */

export default class FabaWebBaseComponent<TProps> extends React.Component<TProps, null>{
    constructor(props:TProps){
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }
}