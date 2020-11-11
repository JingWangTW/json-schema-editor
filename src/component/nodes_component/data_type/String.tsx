import React from 'react';
import { Form, Col, Row, InputGroup, FormControl } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';

import { Type } from './DataType';
import Node from './Node'

class String extends Node {

    protected readonly selfType = Type.String;

    constructor(props: any) {
        super(props)

        this.option = [
            { field: "Max Length", type: "number", minValue: 0 },
            { field: "Min Length", type: "number", minValue: 0 },
            { field: "Format", type: "select", option: ["date-time", "time", "date", "email", "idn-email", "hostname", "idn-hostname", "ipv4", "ipv6", "uri", "uri-reference", "iri", "iri-reference", "uri-template", "json-pointer", "relative-json-pointer", "regex"] },
            { field: "Pattern", type: "number", placeholder: "Regular Expression" },
            { field: "Default", type: "text" },
            { field: "Enum", type: "list" },
            { field: "Constant", type: "string" },
        ]
    }

    RenderChildren(): JSX.Element { return <></> }

    OptionModal(): JSX.Element {
        return (
            <Form>
                <Form.Group as={Row}>
                    <Form.Label column lg="2" htmlFor="Default">
                        Default
                    </Form.Label>
                    <Col lg="10">
                        <Form.Control type="text" min="0" id="Default" />
                    </Col>
                </Form.Group>

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
                        <Form.Control type="text" placeholder="Regular Expression" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="Constant">
                    <Form.Label column lg="2">Constant</Form.Label>
                    <Col lg="10">
                        <Form.Control type="text" placeholder="Restricted Value" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column lg="2" htmlFor="Enum">
                        Enum
                    </Form.Label>
                    <Col lg="10">
                        <Row>
                            <Col lg="12">
                                <InputGroup>
                                    <FormControl type="text" id="Enum" />
                                    <InputGroup.Append>
                                        <InputGroup.Text>
                                            <FaPlus />
                                        </InputGroup.Text>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Col>
                        </Row>
                    </Col>
                </Form.Group>

            </Form>
        );
    }
}

export default String;