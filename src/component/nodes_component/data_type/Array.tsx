import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

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

    OptionModal(): JSX.Element {
        return (
            <Form>
                <Form.Group as={Row}>
                    <Form.Label column lg="2" htmlFor="MinValue">
                        Min Items
                    </Form.Label>
                    <Col lg="4">
                        <Form.Control type="number" min="0" id="MinValue" />
                    </Col>
                    <Form.Label column lg="2" htmlFor="MaxValue">
                        Max Items
                    </Form.Label>
                    <Col lg="4">
                        <Form.Control type="number" min="0" id="MaxValue" />
                    </Col>
                </Form.Group>

                <Form.Group>
                    <Form.Check id="uniqueCheckbox" type="checkbox" label="Unique" />
                </Form.Group>

            </Form>
        );
    }
}

export default Array;