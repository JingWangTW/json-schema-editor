import React from 'react';
import { Form, Col, InputGroup, Button, Modal, OverlayTrigger, Tooltip, FormControl, Row } from 'react-bootstrap';
import { TiPencil } from 'react-icons/ti';
import NodeField, { GenericField } from '../interface/NodeField';
import { NodeState } from '../interface/State';
import { NodeProps } from '../interface/Props';
import ChildNodes from '../ChildNodes';
import { Type } from './DataType';

import NodeOptionButtons from '../NodeOptionButtons';

abstract class Node extends React.Component<NodeProps, NodeState> {

    abstract OptionModal(): JSX.Element;
    abstract recordField(fieldName: keyof NodeField, event: React.ChangeEvent<HTMLElement>): void

    protected abstract readonly selfType: keyof typeof Type;

    protected field: NodeField;
    private childRef: React.RefObject<ChildNodes>;
    private optionFieldFormRef: React.RefObject<HTMLFormElement>;

    constructor(props: NodeProps) {

        super(props);

        this.childRef = React.createRef<ChildNodes>();
        this.optionFieldFormRef = React.createRef<HTMLFormElement>();

        this.state = {
            // default value
            showOptionModal: false,
            showDescriptionModal: false,
            isDeleteAble: true,
            isOptionExist: true,
            hasChild: false,
            hasSibling: true,

            // set arguments
            ...props,
        }

        if (this.props.field)
            this.field = this.props.field;
        else
            this.field = {
                name: "",
            }
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

    addChild(isDeleteAble: boolean = true, hasSibling: boolean = true): void {

        this.childRef.current!.add("", isDeleteAble, hasSibling);

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

    recordGenericField(fieldName: keyof GenericField, event: React.ChangeEvent<HTMLInputElement>): void {

        this.field[fieldName] = event.target.value;

        // need to sync for both input blank
        if (fieldName === "description")
            this.forceUpdate()

    }

    resetOptionFiledForm(): void {

        let fieldName: keyof NodeField;
        for (fieldName in this.field) {
            if (fieldName !== "name" && fieldName !== "title" && fieldName !== "description")
                delete this.field[fieldName]
        }

        if (this.optionFieldFormRef.current)
            this.optionFieldFormRef.current.reset();
    }

    render(): JSX.Element {

        return (
            <div className="my-1">
                <Form>
                    <Form.Row>
                        <Col lg={3}>
                            <Row>
                                <Col lg="auto" className="px-0 mx-0" style={{ width: (this.props.depth * 15).toString() + "px" }}>
                                </Col>
                                <Col>
                                    <Form.Control placeholder="items"
                                        readOnly={this.state.isDeleteAble ? false : true}
                                        defaultValue={this.field.name}
                                        onChange={this.recordGenericField.bind(this, "name")} />
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
                                <option>Boolean</option>
                            </Form.Control>
                        </Col>
                        <Col lg={3}>
                            <Form.Control placeholder="Titile" />
                        </Col>
                        <Col lg={3}>

                            <InputGroup>
                                <FormControl type="text" id="Description" placeholder="Description" defaultValue={this.field.description} value={this.field.description} onChange={this.recordGenericField.bind(this, "description")} />
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
                                        <Form.Control as="textarea" rows={3} defaultValue={this.field.description} onChange={this.recordGenericField.bind(this, "description")} />
                                    </Form.Group>
                                </Modal.Body>
                            </Modal>
                        </Col>
                        <Col lg={2}>
                            <NodeOptionButtons
                                hasChild={this.state.hasChild}
                                hasSibling={this.state.hasSibling}
                                isDeleteAble={this.state.isDeleteAble}
                                isOptionExist={this.state.isOptionExist}
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
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="outline-secondary" onClick={this.resetOptionFiledForm.bind(this)}>Clear</Button>
                                </Modal.Footer>
                            </Modal>
                        </Col>
                    </Form.Row>
                </Form>
                {this.state.hasChild && <ChildNodes ref={this.childRef} depth={this.props.depth + 1} />}
            </div>
        );
    }
}

export default Node;