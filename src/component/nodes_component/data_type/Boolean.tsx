import React from 'react';
import { Form, Col, Row } from 'react-bootstrap';

import { Type } from './DataType';
import Node from './Node';

class Boolean extends Node {

    protected readonly selfType = Type.Boolean;

    OptionModal(): JSX.Element {
        return (
            <Form>
                <Form.Group as={Row}>
                    <Form.Label column lg="2" htmlFor="MinLength">
                        Default
                    </Form.Label>
                    <Col lg="4">
                        <Form.Control as="select">
                            <option>True</option>
                            <option>False</option>
                        </Form.Control>
                    </Col>
                </Form.Group>
            </Form>
        );
    }
}

export default Boolean;