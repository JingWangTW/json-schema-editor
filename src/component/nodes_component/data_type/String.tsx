import React from 'react';
import { Form, Col, Row, InputGroup, FormControl } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';

import { StringField } from '../interface/NodeField';
import { Type } from './DataType';
import Node from './Node'

class String extends Node {

    protected readonly selfType = Type.String;

    recordField(fieldName: keyof StringField, event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void {

        if (fieldName === "min_length" || fieldName === "max_length") {

            this.field[fieldName] = Number(event.target.value);

        } else if (fieldName === "default" || fieldName === "constant" || fieldName === "pattern") {

            this.field[fieldName] = event.target.value;

        } else if (fieldName === "format") {

            this.field[fieldName] = event.target.value as StringField["format"]

        }
    }

    OptionModal(): JSX.Element {
        return (
            <Form>
                <Form.Group as={Row}>
                    <Form.Label column lg="2" htmlFor="Default">
                        Default
                    </Form.Label>
                    <Col lg="10">
                        <Form.Control type="text" min="0" id="Default" onChange={this.recordField.bind(this, "default")} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column lg="2" htmlFor="MinLength">
                        Min Length
                    </Form.Label>
                    <Col lg="4">
                        <Form.Control type="number" min="0" id="MinLength" onChange={this.recordField.bind(this, "min_length")} />
                    </Col>
                    <Form.Label column lg="2" htmlFor="MaxLength">
                        Max Length
                    </Form.Label>
                    <Col lg="4">
                        <Form.Control type="number" min="0" id="MaxLength" onChange={this.recordField.bind(this, "max_length")} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="Format">
                    <Form.Label column lg="2">Format</Form.Label>
                    <Col lg="10">
                        <Form.Control as="select" onChange={this.recordField.bind(this, "format")}>
                            {["date-time", "time", "date", "email", "idn-email", "hostname", "idn-hostname", "ipv4", "ipv6", "uri", "uri-reference", "iri", "iri-reference", "uri-template", "json-pointer", "relative-json-pointer", "regex"].map((v, i) => <option key={i}>{v}</option>)}
                        </Form.Control>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="Pattern">
                    <Form.Label column lg="2">Pattern</Form.Label>
                    <Col lg="10">
                        <Form.Control type="text" placeholder="Regular Expression" onChange={this.recordField.bind(this, "pattern")} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="Constant">
                    <Form.Label column lg="2">Constant</Form.Label>
                    <Col lg="10">
                        <Form.Control type="text" placeholder="Restricted Value" onChange={this.recordField.bind(this, "constant")} />
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