import React from 'react';
import { Form, Col, InputGroup, Button, Modal, OverlayTrigger, Tooltip, FormControl, Row } from 'react-bootstrap';
import nextId from 'react-id-generator';
import { TiPencil } from 'react-icons/ti';

import { GenericField } from '../interface/NodeField';
import { NodeState } from '../interface/State';
import { NodeProps } from '../interface/Props';
import Schema from '../interface/Schema';
import ChildrenNodes from '../ChildrenNodes';
import { Type } from './DataType';
import NodeOptionButtons from '../NodeOptionButtons';


abstract class Node<NodeFieldType extends GenericField> extends React.Component<NodeProps<NodeFieldType>, NodeState<NodeFieldType>> {

    abstract OptionModal(): JSX.Element;
    abstract recordField(fieldName: keyof NodeFieldType, event: React.ChangeEvent<HTMLElement>): void;
    abstract exportSchemaObj(): Schema;

    protected abstract readonly selfType: keyof typeof Type;

    protected childRef: React.RefObject<ChildrenNodes>;
    private optionFieldFormRef: React.RefObject<HTMLFormElement>;

    constructor(props: NodeProps<NodeFieldType>) {

        super(props);

        this.childRef = React.createRef<ChildrenNodes>();
        this.optionFieldFormRef = React.createRef<HTMLFormElement>();

        let fieldDefault = {
            name: nextId("field_"),
            required: true,
        } as NodeFieldType

        // I don't know why, but sometimes props will bring property "filed" and it's value is undefiend.
        // As a result, I setState in two steps
        let s = {
            // default value
            showOptionModal: false,
            showDescriptionModal: false,
            isDeleteAble: true,
            hasChild: false,
            hasSibling: true,
            requiredReadOnly: false,

            field: props.field ? { ...props.field, ...fieldDefault } : fieldDefault,

            // set arguments
            ...props,
        }

        if (!s.field)
            s.field = fieldDefault;

        this.state = s;
    }

    get form() {
        return this.state.field;
    }

    setShowOptionModal(isShow: boolean): void {

        this.setState({
            showOptionModal: isShow,
        });
    }

    setShowDescriptionEditorModal(isShow: boolean): void {

        this.setState({
            showDescriptionModal: isShow
        });
    }

    addSibling(): void {

        if (this.props.addSibling)
            this.props.addSibling(this.props.keyId);
    }

    addChild(): void {

        this.childRef.current!.add("");

    }

    delete(): void {

        if (this.props.delete)
            this.props.delete(this.props.keyId)
    }

    changeType(event: React.ChangeEvent<HTMLSelectElement>): void {

        event.preventDefault();

        if (event.target.value in Type) {
            this.props.changeType(this.props.keyId, (Type as any)[event.target.value])
        }
    }

    setField<T>(fieldName: keyof NodeFieldType, value: T): void {

        this.setState(prevState => ({
            field: {
                ...prevState.field,
                [fieldName]: value
            }
        }))
    }

    recordGenericField(fieldName: keyof GenericField, event: React.ChangeEvent<HTMLInputElement>): void {

        if (fieldName === "name") {

            // needs to check duplicated
            this.props.changeName(this.props.keyId, event.target.value)

            this.setField<string>(fieldName, event.target.value)
        }
        else if (fieldName === "required") {

            this.setField<boolean>(fieldName, event.target.checked)
        }
        // description, title, $comment
        else {

            this.setField<string>(fieldName, event.target.value)
        }
    }

    resetOptionFiledForm(): void {

        let fieldName: keyof NodeFieldType;
        let ff: NodeFieldType = this.state.field;

        for (fieldName in ff) {
            if (fieldName !== "name" && fieldName !== "title" && fieldName !== "description" && fieldName !== "required")
                delete ff[fieldName]
        }

        if (this.optionFieldFormRef.current)
            this.optionFieldFormRef.current.reset();

        this.setState({
            field: ff
        });
    }

    render(): JSX.Element {

        return (
            <div className="my-1">
                {
                    this.state.info &&
                    <Row>
                        <Col lg="auto" className="px-0 mx-0" style={{ width: (this.props.depth * 20).toString() + "px" }} />
                        <Col>
                            <span style={{ color: "green" }}>{this.state.info} </span>
                        </Col>
                    </Row>
                }
                <Form>
                    <Form.Row>
                        <Col lg={3}>
                            <Row>
                                <Col lg="auto" className="px-0 mx-0" style={{ width: (this.props.depth * 20).toString() + "px" }}>
                                </Col>
                                <Col>
                                    <InputGroup>

                                        <OverlayTrigger
                                            trigger={["hover", "focus"]}
                                            overlay={<Tooltip id="add-tooltip"> Required </Tooltip>}
                                        >
                                            <InputGroup.Prepend>
                                                <InputGroup.Checkbox defaultChecked={this.state.field.required} disabled={this.state.requiredReadOnly} onChange={this.recordGenericField.bind(this, "required")} />
                                            </InputGroup.Prepend>
                                        </OverlayTrigger>

                                        <Form.Control placeholder="items"
                                            required
                                            readOnly={this.state.requiredReadOnly}
                                            defaultValue={this.state.field.name}
                                            onChange={this.recordGenericField.bind(this, "name")} />
                                    </InputGroup>
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={1}>
                            <Form.Control as="select" custom placeholder="DataType" onChange={this.changeType.bind(this)} value={this.selfType}>
                                <option>Object</option>
                                <option>Array</option>
                                <option>String</option>
                                <option>Integer</option>
                                <option>Number</option>
                                <option>Null</option>
                                <option>Boolean</option>
                            </Form.Control>
                        </Col>
                        <Col lg={3}>
                            <Form.Control placeholder="Titile" defaultValue={this.state.field.title} onChange={this.recordGenericField.bind(this, "title")} />
                        </Col>
                        <Col lg={4}>

                            <InputGroup>
                                <FormControl type="text" id="Description" placeholder="Description" defaultValue={this.state.field.description} onChange={this.recordGenericField.bind(this, "description")} />
                                <OverlayTrigger
                                    trigger={["hover", "focus"]}
                                    overlay={<Tooltip id="add-tooltip"> Edit </Tooltip>}
                                >
                                    <InputGroup.Append>
                                        <Button variant="outline-primary" onClick={this.setShowDescriptionEditorModal.bind(this, true)}>
                                            <TiPencil />
                                        </Button>
                                    </InputGroup.Append>
                                </OverlayTrigger>
                            </InputGroup>

                            <Modal
                                onHide={this.setShowDescriptionEditorModal.bind(this, false)}
                                show={this.state.showDescriptionModal}
                                size="lg"
                                aria-labelledby="description-modal"
                                centered
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title id="description-modal">
                                        Description
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form.Group>
                                        <Form.Control as="textarea" rows={3} defaultValue={this.state.field.description} onChange={this.recordGenericField.bind(this, "description")} />
                                    </Form.Group>
                                </Modal.Body>
                            </Modal>
                        </Col>
                        <Col lg={1}>
                            <NodeOptionButtons
                                hasChild={this.state.hasChild}
                                hasSibling={this.state.hasSibling}
                                isDeleteAble={this.state.isDeleteAble}
                                clickAddChild={this.addChild.bind(this)}
                                clickAddSibling={this.addSibling.bind(this)}
                                clickDelete={this.delete.bind(this)}
                                clickOption={this.setShowOptionModal.bind(this, true)}
                            />

                            <Modal
                                onHide={this.setShowOptionModal.bind(this, false)}
                                show={this.state.showOptionModal}
                                size="lg"
                                aria-labelledby="option-modal"
                                centered
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title id="option-modal">
                                        Advanced Options
                                </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form ref={this.optionFieldFormRef}>
                                        {this.OptionModal()}
                                        <Form.Group as={Row} controlId="comment">
                                            <Form.Label column lg="2">Comment</Form.Label>
                                            <Col lg="10">
                                                <Form.Control as="textarea" rows={3} onChange={this.recordGenericField.bind(this, "$comment")} />
                                            </Col>
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="outline-secondary" onClick={this.resetOptionFiledForm.bind(this)}>Clear</Button>
                                    <Button variant="outline-success" onClick={this.setShowOptionModal.bind(this, false)}>Close</Button>
                                </Modal.Footer>
                            </Modal>
                        </Col>
                    </Form.Row>
                </Form>
                {this.state.hasChild && <ChildrenNodes ref={this.childRef} depth={this.props.depth + 1} />}
            </div>
        );
    }
}

export default Node;