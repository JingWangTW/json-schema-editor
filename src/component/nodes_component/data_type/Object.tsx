import React from 'react';

import { ObjectField } from '../interface/NodeField';
import { Type } from './DataType';
import Node from './Node'

class Object extends Node {

    protected readonly selfType = Type.Object;

    recordField(fieldName: keyof ObjectField, event: React.ChangeEvent<HTMLInputElement>): void { }

    constructor(props: any) {
        super({
            ...props,
            hasChild: true,
            isOptionExist: false,
        });
    }

    exportSchemaObj(): any {

        return {}
    }

    OptionModal(): JSX.Element { return <></> }
}

export default Object;