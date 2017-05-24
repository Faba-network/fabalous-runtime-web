import * as React from "react";

/**
 * Faba BaseComponent that use shallowCompare for quick rendering if it needs to
 */
export default class FabaWebBaseComponent<TProps, TState> extends React.PureComponent<TProps, TState | void>{

    /**
     * Constructor
     * @param props
     */
    constructor(props:TProps){
        super(props);
    }
}