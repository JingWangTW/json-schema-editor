import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

import { ObjectField } from '../interface/NodeField';
import { ObjectSchema } from '../interface/Schema';
import { Type } from './DataType';
import Node from './Node'

// It will failed if we name a class as "Object"
class ObjectNode extends Node<ObjectField> {
    //class Object extends Node {

    protected readonly selfType = Type.Object;

    recordField(fieldName: keyof ObjectField, event: React.ChangeEvent<HTMLInputElement>): void {

        if (fieldName === "maxProperties" || fieldName === "minProperties") {

            this.setField<number>(fieldName, parseInt(event.target.value))

            // to check if value is correct
            if ((fieldName === "minProperties" && this.state.field.maxProperties && parseInt(event.target.value) > this.state.field.maxProperties) ||
                (fieldName === "maxProperties" && this.state.field.minProperties && parseInt(event.target.value) < this.state.field.minProperties)) {

                this.setState({ optionError: "The number of Min Properties should less than or equal to Max Properties." })
            } else {
                this.setState({ optionError: undefined })
            }
        }

    }

    constructor(props: any) {
        super({
            ...props,
            hasChild: true,
        });
    }

    exportSchemaObj(): ObjectSchema {

        if (this.state.field.maxProperties && this.state.field.minProperties && this.state.field.minProperties > this.state.field.maxProperties)
            throw new Error("Find Error");

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
            ...{ ...this.state.field, name: undefined },
            properties,
            required
        }
    }

    OptionModal(): JSX.Element {
        return (
            <>
                {
                    this.state.optionError &&
                    <span style={{ color: "red" }}>{this.state.optionError} </span>
                }
                <Form.Group as={Row}>
                    <Form.Label column lg="2" htmlFor="MinProperties">
                        Min Properties
                    </Form.Label>
                    <Col lg="4">
                        <Form.Control type="number" min="0" id="MinProperties" defaultValue={this.state.field.minProperties} onChange={this.recordField.bind(this, "minProperties")} />
                    </Col>
                    <Form.Label column lg="2" htmlFor="MaxProperties">
                        Max Properties
                    </Form.Label>
                    <Col lg="4">
                        <Form.Control type="number" min="0" id="MaxProperties" defaultValue={this.state.field.maxProperties} onChange={this.recordField.bind(this, "maxProperties")} />
                    </Col>
                </Form.Group>

            </>
        );
    }
}

export default ObjectNode;