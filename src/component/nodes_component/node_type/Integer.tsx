import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

import Node from '../Node'

class Integer extends Node {

    constructor(props: any) {
        super(props)

        this.option = [
            { field: "Multiple Of", type: "number", minValue: 1 },
            { field: "Minimum", type: "number" },
            { field: "Exclusive Minimum", type: "number" },
            { field: "Maximum", type: "number" },
            { field: "Exclusive Maximum", type: "number" },
            { field: "Default", type: "number" }
        ]
    }

    OptionModal(): JSX.Element {
        return (
            <Form>
                <Form.Group as={Row} controlId="MinValue">
                    <Form.Label column lg="2">
                        Min Value
                    </Form.Label>
                    <Col lg="4">
                        <Form.Control type="number" />
                    </Col>
                    <Col lg="6">
                        <Form.Check id="ExclusiveMin" inline label="Exclusive" type="checkbox" style={{ height: "100%" }} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="MaxValue">
                    <Form.Label column lg="2">
                        Max Value
                    </Form.Label>
                    <Col lg="4">
                        <Form.Control type="number" />
                    </Col>
                    <Col lg="6">
                        <Form.Check id="ExclusiveMax" inline label="Exclusive" type="checkbox" style={{ height: "100%" }} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column lg="2" htmlFor="Default">
                        Default
                    </Form.Label>
                    <Col lg="4">
                        <Form.Control type="number" id="Default" />
                    </Col>
                    <Form.Label column lg="2" htmlFor="MultipleOf">
                        Multiple Of
                    </Form.Label>
                    <Col lg="4">
                        <Form.Control type="number" id="MultipleOf" />
                    </Col>
                </Form.Group>

            </Form>
        );
    }


}

export default Integer;