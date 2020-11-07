import React from 'react';
import { Form, Col, InputGroup, Button, Modal, OverlayTrigger, Tooltip, FormControl } from 'react-bootstrap';
import { TiPencil } from 'react-icons/ti';
import { NodeState } from '../interface/State';
import { NodeProps, NodeOptionListProps } from '../interface/Props';

import NodeOptionButtons from '../NodeOptionButtons';

abstract class Node extends React.Component<NodeProps, NodeState> {

    option!: NodeOptionListProps;

    abstract OptionModal(): JSX.Element;

    constructor(props: NodeProps) {
        super(props);

        this.state = {
            showOptionModal: false,
            showDescriptionModal: false,
            isDeleteAble: true,
            isOptionExist: true,
            ...props,
            // isOptionExist: props.isOptionExist === undefined ? true : props.isOptionExist
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
                            <Form.Control placeholder="items" readOnly={this.state.isDeleteAble ? false : true} />
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
                                <FormControl type="text" id="Description" placeholder="Description" />
                                <OverlayTrigger
                                    trigger="hover"
                                    overlay={<Tooltip id="add-tooltip"> Edit </Tooltip>}
                                >
                                    <InputGroup.Append onClick={this.setShowDescriptionEditorModal.bind(this, true)} style={{ cursor: "pointer" }}>
                                        <InputGroup.Text>
                                            <TiPencil />
                                        </InputGroup.Text>
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
                                        <Form.Control as="textarea" rows={3} />
                                    </Form.Group>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={this.setShowOptionModal.bind(this, false)}>Save</Button>
                                </Modal.Footer>
                            </Modal>
                        </Col>
                        <Col lg={2}>
                            <NodeOptionButtons
                                isDeleteAble={this.state.isDeleteAble}
                                isOptionExist={this.state.isOptionExist}
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