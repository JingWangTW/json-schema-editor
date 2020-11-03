import React from 'react';
import { Form, Col, InputGroup, Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { TiPencil } from 'react-icons/ti';
import { NodeState } from './interface/State';
import { NodeProps, NodeOptionListProps } from './interface/Props';

import NodeOptionButtons from './NodeOptionButtons';

abstract class Node extends React.Component<NodeProps, NodeState> {

    option!: NodeOptionListProps;

    abstract OptionModal(): JSX.Element;

    constructor(props: NodeProps) {
        super(props);

        this.state = {
            showOptionModal: false,
            showDescriptionModal: false,
            optionExist: props.optionExist === undefined ? true : props.optionExist
        }
    }

    setShowOptionModal(isShow: Boolean): void {

        this.setState({
            showOptionModal: isShow,
        });
    }

    setShowDescriptionEditorModal(isShow: Boolean): void {

        this.setState({
            showDescriptionModal: isShow
        });
    }

    render(): JSX.Element {
        return (
            <div className="my-1">
                <Form>
                    <Form.Row>
                        <Col lg={3}>
                            <Form.Control placeholder="items" />
                        </Col>
                        <Col lg={1}>
                            <Form.Control as="select" custom placeholder="DataType">
                                <option>Object</option>
                                <option>Array</option>
                                <option>String</option>
                                <option>Number</option>
                                <option>Boolean</option>
                            </Form.Control>
                        </Col>
                        <Col lg={3}>
                            <Form.Control placeholder="Titile" />
                        </Col>
                        <Col lg={3}>
                            <InputGroup>
                                <Form.Control placeholder="Description" />
                                <InputGroup.Prepend>

                                    <OverlayTrigger
                                        trigger="hover"
                                        overlay={<Tooltip id="add-tooltip"> Edit </Tooltip>}
                                    >
                                        <Button variant="outline-secondary" onClick={this.setShowDescriptionEditorModal.bind(this, true)}>
                                            <TiPencil />
                                        </Button>
                                    </OverlayTrigger>

                                </InputGroup.Prepend>
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
                                        <Form.Control as="textarea" rows={3} />
                                    </Form.Group>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={this.setShowOptionModal.bind(this, false)}>Save</Button>
                                </Modal.Footer>
                            </Modal>
                        </Col>
                        <Col lg={2}>
                            <NodeOptionButtons optionExist={this.state.optionExist} clickOption={this.setShowOptionModal.bind(this, true)} />

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
                                    <this.OptionModal />
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={this.setShowOptionModal.bind(this, false)}>Save</Button>
                                </Modal.Footer>
                            </Modal>
                        </Col>
                    </Form.Row>
                </Form>
            </div>
        );
    }
}

export default Node;