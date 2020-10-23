import React from 'react';
import { Form, Col } from 'react-bootstrap';
import SchemaState from './SchemaState';
import SchemaProps from './SchemaProps';

class SchemaComponent extends React.Component<SchemaProps, SchemaState> {

    SchenaComponent(props: SchemaProps) {

    }

    render() {
        return (
            <div>
                <Form>
                    <Form.Row>
                        <Col>
                            <Form.Control placeholder="items" />
                        </Col>
                        <Col>
                            <Form.Control as="select" custom placeholder="DataType">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </Col>

                        <Col>
                            <Form.Control placeholder="Titile" />
                        </Col>
                        <Col>
                            <Form.Control placeholder="Description" />
                        </Col>
                    </Form.Row>
                </Form>
            </div>
        );
    }
}

export default SchemaComponent;