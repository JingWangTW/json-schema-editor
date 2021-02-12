import "../../index.css";

import React from "react";
import { Accordion, Button, Col, Form, FormControl, InputGroup, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { AiOutlineDown } from "react-icons/ai";
import { TiPencil } from "react-icons/ti";

import Schema from "../../model/schema/Schema";
import { getOrDefault } from "../../model/utility";
import { DataType } from "../../type";
import { IGenericField, IGenericFieldOptions } from "./type_NodeComponent";

interface IGenericFieldProps<T extends IGenericField> {
    options: IGenericFieldOptions;
    schemaType: Schema<T>;

    changeType(props: DataType): void;
}

interface IGenericFieldState {
    currentField: Required<IGenericField>;
    isRequiredFieldReadonly: boolean;
    isNameFieldReadonly: boolean;

    isDescriptionModalShow: boolean;
    isCommentFieldShow: boolean;
}

class GenericField extends React.Component<IGenericFieldProps<IGenericField>, IGenericFieldState> {
    constructor(props: IGenericFieldProps<IGenericField>) {
        super(props);

        const currentField: Required<IGenericField> = props.schemaType.getDefaultField();

        this.state = {
            currentField,
            isRequiredFieldReadonly: getOrDefault(this.props.options.isRequiredFieldReadonly, false),
            isNameFieldReadonly: getOrDefault(this.props.options.isNameFieldReadonly, false),

            isDescriptionModalShow: false,
            isCommentFieldShow: false,
        };
    }

    recordField(fieldName: keyof Omit<IGenericField, "type">, changeEvent: React.ChangeEvent<HTMLInputElement>): void {
        const currentField = this.props.schemaType.recordField(fieldName, changeEvent);
        this.setState({ currentField });
    }

    changeType(changeEvent: React.ChangeEvent<HTMLSelectElement>): void {
        changeEvent.preventDefault();

        const newType = changeEvent.target.value as DataType;

        if (Object.values(DataType).includes(newType)) {
            this.props.changeType(newType);
        }
    }

    setDisplayDescriptionModal(show: boolean): void {
        this.setState({
            isDescriptionModalShow: show,
        });
    }

    render(): JSX.Element {
        return (
            <Accordion>
                <Form.Row>
                    <Col>
                        <Form.Row>
                            <Col lg={3}>
                                <InputGroup>
                                    <OverlayTrigger trigger={["hover", "focus"]} overlay={<Tooltip id="add-tooltip"> Required </Tooltip>}>
                                        <InputGroup.Prepend>
                                            <InputGroup.Checkbox
                                                defaultChecked={this.state.currentField.required}
                                                disabled={this.state.isRequiredFieldReadonly}
                                                onChange={this.recordField.bind(this, "required")}
                                            />
                                        </InputGroup.Prepend>
                                    </OverlayTrigger>

                                    <Form.Control
                                        placeholder="items"
                                        required
                                        readOnly={this.state.isNameFieldReadonly}
                                        defaultValue={this.state.currentField.name}
                                        onChange={this.recordField.bind(this, "name")}
                                    />
                                </InputGroup>
                            </Col>
                            <Col lg={1}>
                                <Form.Control
                                    as="select"
                                    custom
                                    placeholder="DataType"
                                    onChange={this.changeType.bind(this)}
                                    defaultValue={this.state.currentField.type}
                                >
                                    <option value={DataType.Object}>Object</option>
                                    <option value={DataType.Array}>Array</option>
                                    <option value={DataType.String}>String</option>
                                    <option value={DataType.Integer}>Integer</option>
                                    <option value={DataType.Number}>Number</option>
                                    <option value={DataType.Null}>Null</option>
                                    <option value={DataType.Boolean}>Boolean</option>
                                </Form.Control>
                            </Col>
                            <Col lg={4}>
                                <Form.Control
                                    placeholder="Titile"
                                    defaultValue={this.state.currentField.title}
                                    onChange={this.recordField.bind(this, "title")}
                                />
                            </Col>
                            <Col lg={4}>
                                <InputGroup>
                                    <FormControl
                                        type="text"
                                        id="Description"
                                        placeholder="Description"
                                        defaultValue={this.state.currentField.description}
                                        value={this.state.currentField.description}
                                        onChange={this.recordField.bind(this, "description")}
                                    />
                                    <OverlayTrigger trigger={["hover", "focus"]} overlay={<Tooltip id="add-tooltip"> Edit </Tooltip>}>
                                        <InputGroup.Append>
                                            <Button variant="outline-primary" onClick={this.setDisplayDescriptionModal.bind(this, true)}>
                                                <TiPencil />
                                            </Button>
                                        </InputGroup.Append>
                                    </OverlayTrigger>
                                </InputGroup>

                                <Modal
                                    onHide={this.setDisplayDescriptionModal.bind(this, false)}
                                    show={this.state.isDescriptionModalShow}
                                    size="lg"
                                    aria-labelledby="description-modal"
                                    centered
                                >
                                    <Modal.Header closeButton>
                                        <Modal.Title id="description-modal">Description</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form.Group>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                defaultValue={this.state.currentField.description}
                                                value={this.state.currentField.description}
                                                onChange={this.recordField.bind(this, "description")}
                                            />
                                        </Form.Group>
                                    </Modal.Body>
                                </Modal>
                            </Col>
                            <Col lg={12} style={{ paddingTop: "5px" }}>
                                <Accordion.Collapse eventKey="0">
                                    <Form.Control
                                        placeholder="$comment"
                                        defaultValue={this.state.currentField.$comment}
                                        onChange={this.recordField.bind(this, "$comment")}
                                    />
                                </Accordion.Collapse>
                            </Col>
                        </Form.Row>
                    </Col>
                    <Col lg="auto" style={{ cursor: "pointer" }}>
                        <Accordion.Toggle eventKey="0" as="span" className="node-option-block">
                            <AiOutlineDown color="blue" />
                        </Accordion.Toggle>
                    </Col>
                </Form.Row>
            </Accordion>
        );
    }
}

export default GenericField;
