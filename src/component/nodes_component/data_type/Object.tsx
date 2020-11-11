import React from 'react';

import { Type } from './DataType';
import Node from './Node'

class Object extends Node {

    protected readonly selfType = Type.Object;

    constructor(props: any) {
        super({
            ...props,
            hasChild: true,
            isOptionExist: false,
        });
    }

    OptionModal(): JSX.Element { return <></> }
}

export default Object;