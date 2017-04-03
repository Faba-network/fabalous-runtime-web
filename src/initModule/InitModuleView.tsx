import * as React from "react";

import FabaWebBaseComponent from "../FabaWebBaseComponent";
import ReactElement = React.ReactElement;

export default class InitModuleView extends FabaWebBaseComponent<null>{
    constructor(props){
        super(props);
    }

    /**
     *
     * @returns {any}
     */
    render(): ReactElement<any> {
        return(
            <div>
                Welcome to Fabalous!
            </div>
        );
    }
}