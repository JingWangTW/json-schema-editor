import React from 'react';
import { Form, Col, Row } from 'react-bootstrap';

import { BooleanField } from '../interface/NodeField';
import { BooleanSchema } from '../interface/Schema';
import { Type } from './DataType';
import Node from './Node';

class Boolean extends Node<BooleanField> {

    protected readonly selfType = Type.Boolean;

    recordField(fieldName: keyof BooleanField, event: React.ChangeEvent<HTMLSelectElement>): void {

        if (event.target.value === "")
            this.setField<undefined>(fieldName, undefined);
        else if (event.target.value === "True")
            this.setField<boolean>(fieldName, true);
        else
            this.setField<boolean>(fieldName, false);
    }

    exportSchemaObj(): BooleanSchema {

        return {
            type: "boolean",
            default: this.state.field.default,
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