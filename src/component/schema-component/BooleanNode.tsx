import React from 'react';
import { NodeProps } from './interface/SchemaComponentProps';
import Node from './Node';

class BooleanNode extends Node {

    constructor(props: any) {

        super({ ...props, optionExist: false });

        this.option = []
    }

    OptionModal(): JSX.Element {
        return (
            <div></div>
        );
    }
}

export default BooleanNode;