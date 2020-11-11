import React from 'react';
import { Form, Col, InputGroup, Button, Modal, OverlayTrigger, Tooltip, FormControl, Row } from 'react-bootstrap';
import { TiPencil } from 'react-icons/ti';
import { NodeState } from '../interface/State';
import { NodeProps, NodeOptionListProps } from '../interface/Props';
import ChildNodes from '../ChildNodes';
import { Type } from './DataType';

import NodeOptionButtons from '../NodeOptionButtons';

abstract class Node extends React.Component<NodeProps, NodeState> {

    abstract OptionModal(): JSX.Element;
    protected abstract readonly selfType: keyof typeof Type;

    protected option!: NodeOptionListProps;
    private childRef: React.RefObject<ChildNodes>;
    private dataTypeSelectRef: React.RefObject<HTMLSelectElement>;

    constructor(props: NodeProps) {
        super(props);

        this.childRef = React.createRef<ChildNodes>();
        this.dataTypeSelectRef = React.createRef<HTMLSelectElement>();

        this.state = {
            // default value
            showOptionModal: false,
            showDescriptionModal: false,
            isDeleteAble: true,
            isOptionExist: true,
            hasChild: false,

            // set arguments
            ...props,
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

    add(): void {

        this.childRef.current!.addChild();
    }

    changeType(event: React.ChangeEvent<HTMLSelectElement>): void {

        if (event.target.value in Type) {
            this.props.changeType((Type as any)[event.target.value])
        }

        event.preventDefault();
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
                                    <Form.Control placeholder="items" readOnly={this.state.isDeleteAble ? false : true} value={this.props.fieldName ? this.props.fieldName : ""} />
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={1}>
                            <Form.Control as="select" custom placeholder="DataType" ref={this.dataTypeSelectRef} onChange={this.changeType.bind(this)} value={this.selfType}>
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
                                    trigger={["hover", "focus"]}
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
                                hasChild={this.state.hasChild}
                                isDeleteAble={this.state.isDeleteAble}
                                isOptionExist={this.state.isOptionExist}
                                clickAdd={this.add.bind(this)}
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
                {this.state.hasChild && <ChildNodes ref={this.childRef} depth={this.props.depth + 1} />}
            </div>
        );
    }
}

export default Node;