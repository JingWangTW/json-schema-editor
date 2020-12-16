import React from 'react';

import { ObjectField } from '../interface/NodeField';
import { ObjectSchema } from '../interface/Schema';
import { Type } from './DataType';
import Node from './Node'

// It will failed if we name a class as "Object"
class ObjectNode extends Node<ObjectField> {
    //class Object extends Node {

    protected readonly selfType = Type.Object;

    recordField(fieldName: keyof ObjectField, event: React.ChangeEvent<HTMLInputElement>): void { }

    constructor(props: any) {
        super({
            ...props,
            hasChild: true,
            isOptionExist: false,
        });
    }

    exportSchemaObj(): ObjectSchema {

        let children = this.childRef.current?.exportSchemaObj();

        let properties: ObjectSchema["properties"] = {};
        let required: ObjectSchema["required"] = [];

        if (children) {
            for (const child of children) {
                properties[child.name] = {
                    ...child.value
                }
                if (child.required)
                    required.push(child.name);
            }
        }

        return {
            type: "object",
            title: this.state.field.title,
            description: this.state.field.description,
            properties,
            required
        }
    }

    OptionModal(): JSX.Element { return <></> }
}

export default ObjectNode;