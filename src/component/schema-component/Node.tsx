import React from 'react';
import { Form, Col, InputGroup, Button } from 'react-bootstrap';
import { FaFileAlt } from 'react-icons/fa';
import { NodeState } from './interface/SchemaComponentState';
import { NodeProps, NodeOptionListProps } from './interface/SchemaComponentProps';

import NodeOptionButtons from './NodeOptionButtons';

abstract class Node extends React.Component<NodeProps, NodeState> {

    option!: NodeOptionListProps;

    Node(props: NodeProps) { }

    render() {
        return (
            <div>
                <Form>
                    <Form.Row>
                        <Col xl={3}>
                            <Form.Control placeholder="items" />
                        </Col>
                        <Col xl={1}>
                            <Form.Control as="select" custom placeholder="DataType">
                                <option>Object</option>
                                <option>Array</option>
                                <option>String</option>
                                <option>Number</option>
                                <option>Boolean</option>
                            </Form.Control>
                        </Col>
                        <Col xl={3}>
                            <Form.Control placeholder="Titile" />
                        </Col>
                        <Col xl={3}>
                            <InputGroup>
                                <Form.Control placeholder="Description" />
                                <InputGroup.Prepend>
                                    <Button variant="outline-secondary" title="detail">
                                        <FaFileAlt />
                                    </Button>
                                </InputGroup.Prepend>
                            </InputGroup>
                        </Col>
                        <Col xl={2}>
                            <NodeOptionButtons option={this.option} />
                        </Col>
                    </Form.Row>
                </Form>
            </div>
        );
    }
}

export default Node;