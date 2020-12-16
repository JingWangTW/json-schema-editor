import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

import { ArrayField } from '../interface/NodeField';
import { NodeProps } from '../interface/Props';
import Schema, { ArraySchema } from '../interface/Schema';
import { Type } from './DataType';
import Node from './Node'

class Array extends Node<ArrayField> {

    protected readonly selfType = Type.Array;

    constructor(props: NodeProps<ArrayField>) {
        super({
            ...props,
            hasChild: true,
        });
    }

    componentDidMount() {

        this.addChild();
    }

    exportSchemaObj(): ArraySchema {

        let child = this.childRef.current!.exportSchemaObj();
        let items: Schema | Schema[];


        if (child.length === 1) {

            items = child[0].value;

        } else {

            items = child.map(c => c.value)

        }

        return {
            type: "array",
            ...{ ...this.state.field, required: undefined, name: undefined },

            items
        }
    }

    addChild(): void {

        if (this.childRef.current!.length === 0) {

            this.childRef.current!.add("", {
                isDeleteAble: false,
                hasSibling: true,
                requiredReadOnly: true,
            });

        } else {

            this.childRef.current!.add("", {
                isDeleteAble: true,
                hasSibling: true,
                requiredReadOnly: true,
            });
        }

        if (this.childRef.current!.length >= 2)
            this.setState({ info: "Ordinal index of each item in Array type is meaningful." })

    }

    delete(): void {

        if (this.props.delete)
            this.props.delete(this.props.keyId)
    }

    recordField(fieldName: keyof ArrayField, event: React.ChangeEvent<HTMLInputElement>): void {

        // minItems, max_Items
        if (fieldName === "minItems" || fieldName === "maxItems") {

            this.setField<number>(fieldName, parseInt(event.target.value))

            // uniqueItems
        } else {

            this.setField<boolean>(fieldName, event.target.checked)
        }
    }

    OptionModal(): JSX.Element {
        return (
            <>
                <Form.Group as={Row}>
                    <Form.Label column lg="2" htmlFor="MinItems">
                        Min Items
                    </Form.Label>
                    <Col lg="4">
                        <Form.Control type="number" min="0" id="MinItems" defaultValue={this.state.field.minItems} onChange={this.recordField.bind(this, "minItems")} />
                    </Col>
                    <Form.Label column lg="2" htmlFor="MaxItems">
                        Max Items
                    </Form.Label>
                    <Col lg="4">
                        <Form.Control type="number" min="0" id="MaxItems" defaultValue={this.state.field.maxItems} onChange={this.recordField.bind(this, "maxItems")} />
                    </Col>
                </Form.Group>

                <Form.Group>
                    <Form.Check type="checkbox" id="uniqueCheckbox">
                        <Form.Check.Input type="checkbox" defaultChecked={this.state.field.uniqueItems} checked={this.state.field.uniqueItems} onChange={this.recordField.bind(this, "uniqueItems")} />
                        <Form.Check.Label>Unique</Form.Check.Label>
                    </Form.Check>
                </Form.Group>

            </>
        );
    }
}

export default Array;