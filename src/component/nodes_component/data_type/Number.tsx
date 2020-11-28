import React from 'react';
import { Form, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';

import { NumberField } from '../interface/NodeField';
import { Type } from './DataType';
import Node from './Node'

class Number extends Node {

    protected readonly selfType = Type.Number;

    recordField(fieldName: keyof NumberField, event: React.ChangeEvent<HTMLInputElement>): void {

        if (fieldName === "default" || fieldName === "constant" || fieldName === "min_value" || fieldName === "max_value") {

            this.field[fieldName] = parseFloat(event.target.value);

        } else if (fieldName === "max_exclusive" || fieldName === "min_exclusive") {

            this.field[fieldName] = event.target.checked;

        }
    }

    OptionModal(): JSX.Element {
        return (
            <Form>
                <Form.Group as={Row} controlId="MinValue">
                    <Form.Label column lg="2">
                        Min Value
                    </Form.Label>
                    <Col lg="4">
                        <Form.Control type="number" onChange={this.recordField.bind(this, "min_value")} />
                    </Col>
                    <Col lg="6">
                        <Form.Check id="ExclusiveMin" inline label="Exclusive" type="checkbox" style={{ height: "100%" }} onChange={this.recordField.bind(this, "min_exclusive")} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="MaxValue">
                    <Form.Label column lg="2">
                        Max Value
                    </Form.Label>
                    <Col lg="4">
                        <Form.Control type="number" onChange={this.recordField.bind(this, "max_value")} />
                    </Col>
                    <Col lg="6">
                        <Form.Check id="ExclusiveMax" inline label="Exclusive" type="checkbox" style={{ height: "100%" }} onChange={this.recordField.bind(this, "max_exclusive")} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column lg="2" htmlFor="Default">
                        Default
                    </Form.Label>
                    <Col lg="4" id="Default">
                        <Form.Control type="number" onChange={this.recordField.bind(this, "default")} />
                    </Col>
                    <Form.Label column lg="2" htmlFor="Constant">
                        Constant
                    </Form.Label>
                    <Col lg="4">
                        <Form.Control type="number" id="Constant" placeholder="Restricted Value" onChange={this.recordField.bind(this, "constant")} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="Enum">
                    <Form.Label column lg="2" htmlFor="Enum">
                        Enum
                    </Form.Label>
                    <Col lg="4">
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

export default Number;