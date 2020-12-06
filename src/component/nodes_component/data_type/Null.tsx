import React from 'react';

import { NullField } from '../interface/NodeField';
import { Type } from './DataType';
import Node from './Node'

class Null extends Node {

    protected readonly selfType = Type.Null;

    recordField(fieldName: keyof NullField, event: React.ChangeEvent<HTMLInputElement>): void { }

    constructor(props: any) {
        super({
            ...props,
            hasChild: false,
            isOptionExist: false,
        });
    }

    exportSchemaObj(): any {

        return {
            type: "null",
            title: this.field.title,
            description: this.field.description,
        }
    }

    OptionModal(): JSX.Element { return <></> }
}

export default Null;