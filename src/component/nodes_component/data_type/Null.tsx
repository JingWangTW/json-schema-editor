import React from 'react';

import { NullField } from '../interface/NodeField';
import { NullSchema } from '../interface/Schema';
import { Type } from './DataType';
import Node from './Node'

class Null extends Node<NullField> {

    protected readonly selfType = Type.Null;

    recordField(fieldName: keyof NullField, event: React.ChangeEvent<HTMLInputElement>): void { }

    constructor(props: any) {
        super({
            ...props,
            isOptionExist: false,
        });
    }

    exportSchemaObj(): NullSchema {

        return {
            type: "null",
            ...{ ...this.state.field, required: undefined, name: undefined }
        }
    }

    OptionModal(): JSX.Element { return <></> }
}

export default Null;