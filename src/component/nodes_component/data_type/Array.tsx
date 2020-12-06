import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

import { ArrayField } from '../interface/NodeField';
import { Type } from './DataType';
import Node from './Node'

class Array extends Node {

    protected readonly selfType = Type.Array;

    constructor(props: any) {
        super({
            ...props,
            hasChild: true,
        });
    }

    componentDidMount() {

        this.addChild(false, false);

    }

    exportSchemaObj(): any {

        let child = this.childRef.current!.exportSchemaObj();

        return {
            type: "array",
            title: this.field.title,
            description: this.field.description,
            uniqueItems: this.field.uniqueItems,
            minItems: this.field.minItems,
            maxItems: this.field.maxItems,
            items: child[0].value
        }
    }

    recordField(fieldName: keyof ArrayField, event: React.ChangeEvent<HTMLInputElement>): void {

        // minItems, max_Items
        if (fieldName === "minItems" || fieldName === "maxItems") {

            this.field[fieldName] = Number(event.target.value);

            // uniqueItems
        } else {

            this.field[fieldName] = event.target.checked;

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
                        <Form.Control type="number" min="0" id="MinItems" onChange={this.recordField.bind(this, "minItems")} />
                    </Col>
                    <Form.Label column lg="2" htmlFor="MaxItems">
                        Max Items
                    </Form.Label>
                    <Col lg="4">
                        <Form.Control type="number" min="0" id="MaxItems" onChange={this.recordField.bind(this, "maxItems")} />
                    </Col>
                </Form.Group>

                <Form.Group>
                    <Form.Check id="uniqueCheckbox" type="checkbox" label="Unique" onChange={this.recordField.bind(this, "uniqueItems")} />
                </Form.Group>

            </>
        );
    }
}

export default Array;