import React from 'react';
import { Form, Col, InputGroup, Button, Modal } from 'react-bootstrap';
import { FaFileAlt } from 'react-icons/fa';
import { NodeState } from './interface/SchemaComponentState';
import { NodeProps, NodeOptionListProps } from './interface/SchemaComponentProps';

import NodeOptionButtons from './NodeOptionButtons';

abstract class Node extends React.Component<NodeProps, NodeState> {

    option!: NodeOptionListProps;

    abstract OptionModal(): JSX.Element;

    constructor(props: NodeProps) {
        super(props);

        this.state = {
            showOptionModal: false,
            optionExist: props.optionExist === undefined ? true : props.optionExist
        }
    }

    setShowOptionModal(isShow: Boolean): void {

        this.setState({
            showOptionModal: isShow,
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
                                    <Button variant="outline-secondary" title="detail">
                                        <FaFileAlt />
                                    </Button>
                                </InputGroup.Prepend>
                            </InputGroup>
                        </Col>
                        <Col lg={2}>
                            <NodeOptionButtons optionExist={this.state.optionExist} clickOption={this.setShowOptionModal.bind(this, true)} />

                            <Modal
                                onHide={this.setShowOptionModal.bind(this, false)}
                                show={this.state.showOptionModal}
                                size="lg"
                                aria-labelledby="contained-modal-title-vcenter"
                                centered
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title id="contained-modal-title-vcenter">
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