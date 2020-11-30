import React from 'react';
import { Row, Col } from 'react-bootstrap';
import nextId from "react-id-generator";

import * as DataType from './data_type/DataType';
import { ChildNodesProps } from './interface/Props';
import { ChildNodesState } from './interface/State';
import { Type } from './data_type/DataType';

import Factory from './data_type/Factory';

class ChildNodes extends React.Component<ChildNodesProps, ChildNodesState>{

    constructor(props: ChildNodesProps) {
        super(props);

        this.state = {
            children: [],
            checkNameDuplicate: false
        };
    }

    add(keyId: string, isDeleteAble: boolean = true, hasSibling: boolean = true): void {

        const id = nextId('field_');
        const originChildren = this.state.children;
        let currentIndex;

        // push to the last one
        if (keyId === "")
            currentIndex = originChildren.length - 1;
        else
            currentIndex = originChildren.findIndex(child => child.keyId === keyId);;

        originChildren.splice(currentIndex + 1, 0, {
            delete: this.delete.bind(this),
            addSibling: this.add.bind(this),
            type: DataType.Type.Object,
            isDeleteAble,
            hasSibling,
            keyId: id,
            name: id
        })

        this.setState({ children: originChildren })
    }

    delete(keyId: string) {

        const originChildren = this.state.children;
        const currentIndex = originChildren.findIndex(child => child.keyId === keyId);;

        originChildren.splice(currentIndex, 1)

        this.setState({ children: originChildren })
    }

    changeType(keyId: string, type: keyof typeof Type): void {

        this.setState((prevState) => {

            const children = prevState.children.map((child) => {

                if (child.keyId === keyId) {
                    return {
                        ...child,
                        type: type
                    };
                } else {
                    return child;
                }
            });

            return {
                children
            };
        });
    }

    exportSchemaObj(): any {
        return {};
    }

    checkAndChangeChildName(keyId: string, name: string): void {

        let checkNameDuplicate: boolean = false;

        for (const child of this.state.children) {

            if (child.keyId !== keyId && child.name === name) {
                checkNameDuplicate = true;
                break;
            }
        }

        this.setState((prevState) => {

            const children = prevState.children.map((child) => {

                if (child.keyId === keyId) {
                    return {
                        ...child,
                        name: name
                    };
                } else {
                    return child;
                }
            });

            return {
                children,
                checkNameDuplicate,
            };
        });
    }

    render() {

        return (
            <>
                {
                    this.state.checkNameDuplicate &&
                    <Row>
                        <Col lg="auto" className="px-0 mx-0" style={{ width: (this.props.depth * 20).toString() + "px" }} />
                        <Col>
                            <span style={{ color: "red" }}>Find duplicated field name in this layer </span>
                        </Col>
                    </Row>
                }
                {
                    this.state.children.map((child, index) =>
                        <Factory key={child.keyId}
                            {...child}
                            field={{ name: child.name }}
                            changeType={this.changeType.bind(this)}
                            changeName={this.checkAndChangeChildName.bind(this)}
                            depth={this.props.depth} />
                    )
                }
            </>
        );
    }
}

export default ChildNodes;