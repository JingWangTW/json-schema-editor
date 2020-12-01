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

        let children = this.childRef.current?.exportSchemaObj();

        let properties: any = {}
        let required: string[] = [];

        for (const child of children) {
            properties[child.name] = {
                ...child.value
            }
            if (child.required)
                required.push(child.name);
        }

        return {
            type: "object",
            title: this.field.title,
            description: this.field.description,
            properties,
            required
        }
    }

    OptionModal(): JSX.Element { return <></> }
}

export default Object;