import React from 'react';
import { Form, Col, Row } from 'react-bootstrap';

import Node from '../Node'

class String extends Node {

    constructor(props: any) {
        super(props)

        this.option = [
            { field: "Max Length", type: "number", minValue: 0 },
            { field: "Min Length", type: "number", minValue: 0 },
            { field: "Format", type: "select", option: ["date-time", "time", "date", "email", "idn-email", "hostname", "idn-hostname", "ipv4", "ipv6", "uri", "uri-reference", "iri", "iri-reference", "uri-template", "json-pointer", "relative-json-pointer", "regex"] },
            { field: "Pattern", type: "number", placeholder: "Regular Expression" },
        ]
    }

    OptionModal(): JSX.Element {
        return (
            <Form>
                <Form.Group as={Row}>
                    <Form.Label column lg="2" htmlFor="MinLength">
                        Min Length
                    </Form.Label>
                    <Col lg="4">
                        <Form.Control type="number" min="0" id="MinLength" />
                    </Col>
                    <Form.Label column lg="2" htmlFor="MaxLength">
                        Max Length
                    </Form.Label>
                    <Col lg="4">
                        <Form.Control type="number" min="0" id="MaxLength" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="Format">
                    <Form.Label column lg="2">Format</Form.Label>
                    <Col lg="10">
                        <Form.Control as="select">
                            {["date-time", "time", "date", "email", "idn-email", "hostname", "idn-hostname", "ipv4", "ipv6", "uri", "uri-reference", "iri", "iri-reference", "uri-template", "json-pointer", "relative-json-pointer", "regex"].map(v => <option>{v}</option>)}
                        </Form.Control>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="Pattern">
                    <Form.Label column lg="2">Pattern</Form.Label>
                    <Col lg="10">
                        <Form.Control type="text" placeholder="Regular Expression">
                        </Form.Control>
                    </Col>
                </Form.Group>
            </Form>
        );
    }


}

export default String;