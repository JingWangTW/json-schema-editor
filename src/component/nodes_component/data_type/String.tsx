import React from 'react';
import { Form, Col, Row, InputGroup, FormControl, Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';

import { StringField } from '../interface/NodeField';
import { Type } from './DataType';
import Node from './Node'

class String extends Node {

    protected readonly selfType = Type.String;

    recordField(fieldName: keyof StringField, event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void {

        if (fieldName === "minLength" || fieldName === "maxLength") {

            this.setField<number>(fieldName, parseInt(event.target.value))

        } else if (fieldName === "default" || fieldName === "constant" || fieldName === "pattern") {

            this.setField<string>(fieldName, event.target.value)

        } else if (fieldName === "format") {

            if (event.target.value === "")
                this.setField<undefined>(fieldName, undefined)
            else
                this.setField<StringField["format"]>(fieldName, event.target.value as StringField["format"])
        }
    }

    recordEnumField(key: number, event: React.ChangeEvent<HTMLInputElement>): void {

        this.setField<(string | number)[]>("enum", this.state.field.enum!.map((e, i) => i === key ? event.target.value : e))
    }

    addEnum(event: React.MouseEvent<HTMLButtonElement>): void {

        event.preventDefault();

        let e: (number | string)[];

        if (!this.state.field.enum)
            e = [""]
        else
            e = [...this.state.field.enum, ""];

        this.setField<(number | string)[]>("enum", e)
    }

    exportSchemaObj(): any {
        return {
            type: "string",
            ...this.state.field,
        };
    }

    OptionModal(): JSX.Element {
        return (
            <>
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
                        <Form.Control type="number" min="0" id="MinLength" onChange={this.recordField.bind(this, "minLength")} />
                    </Col>
                    <Form.Label column lg="2" htmlFor="MaxLength">
                        Max Length
                    </Form.Label>
                    <Col lg="4">
                        <Form.Control type="number" min="0" id="MaxLength" onChange={this.recordField.bind(this, "maxLength")} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="Format">
                    <Form.Label column lg="2">Format</Form.Label>
                    <Col lg="10">
                        <Form.Control as="select" onChange={this.recordField.bind(this, "format")}>
                            {["", "date-time", "time", "date", "email", "idn-email", "hostname", "idn-hostname", "ipv4", "ipv6", "uri", "uri-reference", "iri", "iri-reference", "uri-template", "json-pointer", "relative-json-pointer", "regex"].map((v, i) => <option key={i}>{v}</option>)}
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

                {
                    this.state.field.enum
                        ?
                        (
                            (this.state.field.enum as Array<number | string>).map((enumeration, index: number) => (
                                <Form.Group as={Row} key={index}>
                                    <Form.Label column lg="2">
                                        {index === 0 ? "Enum" : ""}
                                    </Form.Label>
                                    <Col lg="10">
                                        {
                                            index === this.state.field.enum!.length - 1
                                                ?
                                                (
                                                    <InputGroup>
                                                        <FormControl type="text" id={index.toString()} onChange={this.recordEnumField.bind(this, index)} defaultValue={enumeration} />
                                                        <InputGroup.Append>
                                                            <Button variant="outline-success" onClick={this.addEnum.bind(this)}>
                                                                <FaPlus />
                                                            </Button>
                                                        </InputGroup.Append>
                                                    </InputGroup>
                                                )
                                                :
                                                (
                                                    <FormControl type="text" id={index.toString()} onChange={this.recordEnumField.bind(this, index)} defaultValue={enumeration} />
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

            </ >
        );
    }
}

export default String;