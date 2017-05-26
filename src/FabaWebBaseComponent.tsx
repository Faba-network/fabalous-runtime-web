import * as React from "react";
const shallowCompare = require('react-addons-shallow-compare');

/**
 * Faba BaseComponent that use shallowCompare for quick rendering if it needs to
 */
export default class FabaWebBaseComponent<TProps, TState = {}> extends React.PureComponent<TProps, TState>{

    /**
     * Constructor
     * @param props
     */
    constructor(props:TProps){
        super(props);
    }


    /**
     * Implemented by React
     * @param nextProps
     * @param nextState
     * @returns {any}
     */
    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }
}