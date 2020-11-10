import React from 'react';
import Node from './node_type/Node';

class RootNode extends Node {

    constructor(props: any) {
        super({
            ...props,
            isDeleteAble: false,
            isOptionExist: false,
            fieldName: "root",
            hasChild: true,
        });
    }

    OptionModal(): JSX.Element {
        return (
            <div></div>
        );
    }
}

export default RootNode;