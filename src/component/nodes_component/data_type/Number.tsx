import React from 'react';
import { Form, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';

import { NumberField } from '../interface/NodeField';
import { Type } from './DataType';
import Node from './Node'

class Number extends Node {

    protected readonly selfType = Type.Number;

    recordField(fieldName: keyof NumberField, event: React.ChangeEvent<HTMLInputElement>): void {

        if (fieldName === "default" || fieldName === "constant" || fieldName === "minValue" || fieldName === "maxValue" || fieldName === "multipleOf") {

            this.field[fieldName] = parseFloat(event.target.value);

        } else if (fieldName === "maxExclusive" || fieldName === "minExclusive") {

            this.field[fieldName] = event.target.checked;

        }
    }

    recordEnumField(key: number, event: React.ChangeEvent<HTMLInputElement>): void {

        this.field.enum![key] = parseFloat(event.target.value);
    }

    addEnum(): void {

        if (!this.field.enum)
            this.field.enum = [];

        this.field.enum!.push("")

        this.forceUpdate();
    }

    exportSchemaObj(): any {

        let range: any = {};
        if (this.field.minValue) {
            if (this.field.minExclusive)
                range['exclusiveMinimum'] = this.field.minValue;
            else
                range['minimum'] = this.field.minValue;
        }

        if (this.field.maxValue) {
            if (this.field.maxExclusive)
                range['exclusiveMaximum'] = this.field.maxValue;
            else
                range['maximum'] = this.field.maxValue;
        }

        return {
            type: "number",
            title: this.field.title,
            description: this.field.description,

            constant: this.field.constant,
            default: this.field.default,
            ...range,
            multipleOf: this.field.multipleOf,

            enum: this.field.enum,
        };
    }

    OptionModal(): JSX.Element {
        return (
            <>
                <Form.Group as={Row} controlId="MinValue">
                    <Form.Label column lg="2">
                        Min Value
                    </Form.Label>
                    <Col lg="4">
                        <Form.Control type="number" onChange={this.recordField.bind(this, "minValue")} />
                    </Col>
                    <Col lg="6">
                        <Form.Check id="ExclusiveMin" inline label="Exclusive" type="checkbox" style={{ height: "100%" }} onChange={this.recordField.bind(this, "minExclusive")} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="MaxValue">
                    <Form.Label column lg="2">
                        Max Value
                    </Form.Label>
                    <Col lg="4">
                        <Form.Control type="number" onChange={this.recordField.bind(this, "maxValue")} />
                    </Col>
                    <Col lg="6">
                        <Form.Check id="ExclusiveMax" inline label="Exclusive" type="checkbox" style={{ height: "100%" }} onChange={this.recordField.bind(this, "maxExclusive")} />
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
                        <Form.Control type="number" id="MultipleOf" onChange={this.recordField.bind(this, "multipleOf")} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column lg="2" htmlFor="Constant">
                        Constant
                    </Form.Label>
                    <Col lg="4">
                        <Form.Control type="number" id="Constant" placeholder="Restricted Value" onChange={this.recordField.bind(this, "constant")} />
                    </Col>

                </Form.Group>

                {
                    this.field.enum
                        ?
                        (
                            (this.field.enum as Array<number | string>).map((enumeration, index: number) => (
                                <Form.Group as={Row} key={index}>
                                    <Form.Label column lg="2">
                                        {index === 0 ? "Enum" : ""}
                                    </Form.Label>
                                    <Col lg="6">
                                        {
                                            index === this.field.enum!.length - 1
                                                ?
                                                (
                                                    <InputGroup>
                                                        <FormControl type="number" id={index.toString()} onChange={this.recordEnumField.bind(this, index)} defaultValue={enumeration} />
                                                        <InputGroup.Append>
                                                            <Button variant="outline-success" onClick={this.addEnum.bind(this)}>
                                                                <FaPlus />
                                                            </Button>
                                                        </InputGroup.Append>
                                                    </InputGroup>
                                                )
                                                :
                                                (
                                                    <FormControl type="number" id={index.toString()} onChange={this.recordEnumField.bind(this, index)} defaultValue={enumeration} />
                                                )
                                        }
                                    </Col>
                                </Form.Group>
                            ))
                        )
                        :
                        (
                            <Form.Group as={Row}>
                                <Form.Label column lg="2">
                                    Enum
                                </Form.Label>
                                <Col lg="10">
                                    <Row>
                                        <Col lg="12">
                                            <Button variant="outline-success" onClick={this.addEnum.bind(this)}>
                                                <FaPlus color="green" />
                                            </Button>

                                        </Col>
                                    </Row>
                                </Col>
                            </Form.Group>
                        )
                }
            </>
        );
    }
}

export default Number;