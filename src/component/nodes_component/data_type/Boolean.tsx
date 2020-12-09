import React from 'react';
import { Form, Col, Row } from 'react-bootstrap';

import { BooleanField } from '../interface/NodeField';
import { Type } from './DataType';
import Node from './Node';

class Boolean extends Node {

    protected readonly selfType = Type.Boolean;

    recordField(fieldName: keyof BooleanField, event: React.ChangeEvent<HTMLSelectElement>): void {

        if (event.target.value === "")
            this.setField<undefined>(fieldName, undefined);
        else if (event.target.value === "True")
            this.setField<boolean>(fieldName, true);
        else
            this.setField<boolean>(fieldName, false);
    }

    exportSchemaObj(): any {

        return {
            type: "boolean",
            ...this.state.field
        };
    }

    OptionModal(): JSX.Element {
        return (
            <>
                <Form.Group as={Row}>
                    <Form.Label column lg="2" htmlFor="MinLength">
                        Default
                    </Form.Label>
                    <Col lg="4">
                        <Form.Control as="select" onChange={this.recordField.bind(this, "default")}>
                            <option></option>
                            <option>True</option>
                            <option>False</option>
                        </Form.Control>
                    </Col>
                </Form.Group>
            </>
        );
    }
}

export default Boolean;