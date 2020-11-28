import React from 'react';
import { Form, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';

import { IntegerField } from '../interface/NodeField';
import { Type } from './DataType';
import Node from './Node'

class Integer extends Node {

    protected readonly selfType = Type.Integer;

    recordField(fieldName: keyof IntegerField, event: React.ChangeEvent<HTMLInputElement>): void {

        if (fieldName === "default" || fieldName === "constant" || fieldName === "min_value" || fieldName === "max_value" || fieldName === "multiple_of") {

            this.field[fieldName] = Number(event.target.value);

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
                        <Form.Check id="ExclusiveMin" inline
                            label="Exclusive" type="checkbox" style={{ height: "100%" }} onChange={this.recordField.bind(this, "min_exclusive")} />
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
                    <Col lg="4">
                        <Form.Control type="number" id="Default" onChange={this.recordField.bind(this, "default")} />
                    </Col>
                    <Form.Label column lg="2" htmlFor="MultipleOf">
                        Multiple Of
                    </Form.Label>
                    <Col lg="4">
                        <Form.Control type="number" id="MultipleOf" onChange={this.recordField.bind(this, "multiple_of")} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column lg="2" htmlFor="Constant">
                        Constant
                    </Form.Label>
                    <Col lg="4">
                        <Form.Control type="number" id="Constant" placeholder="Restricted Value" onChange={this.recordField.bind(this, "constant")} />
                    </Col>

                    <Form.Label column lg="2" htmlFor="Enum">
                        Enum
                    </Form.Label>
                    <Col lg="4">
                        <Row>
                            <Col lg="12">
                                <InputGroup>
                                    <FormControl type="number" id="Enum" />
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

export default Integer;