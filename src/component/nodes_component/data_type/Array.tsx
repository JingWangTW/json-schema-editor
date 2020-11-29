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

    recordField(fieldName: keyof ArrayField, event: React.ChangeEvent<HTMLInputElement>): void {

        if (fieldName === "min_items" || fieldName === "max_items") {

            this.field[fieldName] = Number(event.target.value);

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
                        <Form.Control type="number" min="0" id="MinItems" onChange={this.recordField.bind(this, "min_items")} />
                    </Col>
                    <Form.Label column lg="2" htmlFor="MaxItems">
                        Max Items
                    </Form.Label>
                    <Col lg="4">
                        <Form.Control type="number" min="0" id="MaxItems" onChange={this.recordField.bind(this, "max_items")} />
                    </Col>
                </Form.Group>

                <Form.Group>
                    <Form.Check id="uniqueCheckbox" type="checkbox" label="Unique" onChange={this.recordField.bind(this, "unique")} />
                </Form.Group>

            </>
        );
    }
}

export default Array;