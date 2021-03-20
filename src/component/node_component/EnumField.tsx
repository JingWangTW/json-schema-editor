import React from "react";
import { Button, Col, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import { FaMinus, FaPlus } from "react-icons/fa";

import { EmptyState } from "../type_component";
import InstructionIcon from "./InstructionIcon";

interface EnumFieldProps<T> {
    type: "number" | "text";

    value: T[];
    width: number;
    add(): void;
    update(index: number, changeEvent: React.ChangeEvent<HTMLInputElement>): void;
    delete(index: number): void;
}

class EnumField<T extends string | number> extends React.Component<EnumFieldProps<T>, EmptyState> {
    render(): JSX.Element {
        return (
            <Form.Group>
                {this.props.value.length > 0 ? (
                    this.props.value.map((enumeration, index: number) => (
                        <Form.Group as={Row} key={index}>
                            <Form.Label column lg="2">
                                {index === 0 ? (
                                    <span>
                                        Enum
                                        <InstructionIcon text="An instance would be valid if its valie is equal to one of the elements in this keyword's array value." />
                                    </span>
                                ) : (
                                    ""
                                )}
                            </Form.Label>
                            <Col lg={this.props.width}>
                                {index === this.props.value.length - 1 ? (
                                    <InputGroup>
                                        <FormControl
                                            type={this.props.type}
                                            id={index.toString()}
                                            onChange={this.props.update.bind(this, index)}
                                            value={enumeration}
                                        />
                                        <InputGroup.Append>
                                            <Button variant="outline-danger" onClick={this.props.delete.bind(this, index)}>
                                                <FaMinus />
                                            </Button>
                                        </InputGroup.Append>
                                        <InputGroup.Append>
                                            <Button variant="outline-success" onClick={this.props.add}>
                                                <FaPlus />
                                            </Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                ) : (
                                    <InputGroup>
                                        <FormControl
                                            type={this.props.type}
                                            id={index.toString()}
                                            onChange={this.props.update.bind(this, index)}
                                            value={enumeration}
                                        />
                                        <InputGroup.Append>
                                            <Button variant="outline-danger" onClick={this.props.delete.bind(this, index)}>
                                                <FaMinus />
                                            </Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                )}
                            </Col>
                        </Form.Group>
                    ))
                ) : (
                    <Form.Group as={Row}>
                        <Form.Label column lg="2">
                            Enum
                            <InstructionIcon text="An instance would be valid if its valie is equal to one of the elements in this keyword's array value." />
                        </Form.Label>
                        <Col lg="10">
                            <Row>
                                <Col lg="12">
                                    <Button variant="outline-success" onClick={this.props.add.bind(this)}>
                                        <FaPlus color="green" />
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Form.Group>
                )}
            </Form.Group>
        );
    }
}

export default EnumField;
