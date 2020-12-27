import React from 'react';
import { Row, Col } from 'react-bootstrap';
import nextId from "react-id-generator";

import NodeField from './interface/NodeField';
import { ChildrenSchema } from './interface/Schema';
import { NewChildNodeProps } from './interface/Props';
import * as DataType from './data_type/DataType';
import { Type, Node } from './data_type/DataType';

import Factory from './data_type/Factory';

interface ChildNodeProperty {

    type: keyof typeof DataType.Type;
    isDeleteAble: boolean;
    hasSibling: boolean;
    requiredReadOnly: boolean;
    keyId: string;
    ref: React.RefObject<DataType.Node<NodeField>>;

    delete(keyId: string): void;
    addSibling(keyId: string): void;
}

interface ChildrenNodesProps {
    depth: number;
}

interface ChildrenNodesState {
    children: Array<ChildNodeProperty>;

    error?: string;
};

class ChildrenNodes extends React.Component<ChildrenNodesProps, ChildrenNodesState>{

    constructor(props: ChildrenNodesProps) {
        super(props);

        this.state = {
            children: [],
        };
    }

    get length() {
        return this.state.children.length;
    }

    add(keyId: string, props?: NewChildNodeProps): void {

        const originChildren = this.state.children;
        let currentIndex;

        let p: NewChildNodeProps = {
            isDeleteAble: true,
            hasSibling: true,
            requiredReadOnly: false,
        }

        if (props) {

            p = {
                ...p,
                ...props
            }
        }

        // push to the last one
        if (keyId === "")
            currentIndex = originChildren.length - 1;
        else
            currentIndex = originChildren.findIndex(child => child.keyId === keyId);;

        originChildren.splice(currentIndex + 1, 0, {
            delete: this.delete.bind(this),
            addSibling: this.add.bind(this),
            type: DataType.Type.Object,
            isDeleteAble: p.isDeleteAble as boolean,
            hasSibling: p.hasSibling as boolean,
            requiredReadOnly: p.requiredReadOnly as boolean,
            keyId: nextId('child_node-'),
            ref: React.createRef<Node<NodeField>>()
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

    exportSchemaObj(): ChildrenSchema {

        if (this.state.error) {

            throw new Error("Find Error");

        } else {

            return this.state.children.map(child => ({
                name: child.ref.current!.form.name,
                value: child.ref.current!.exportSchemaObj(),
                required: child.ref.current!.form.required,
            }));
        }
    }

    checkChildName(keyId: string, name: string): void {

        let checkNameDuplicate: boolean = false;

        for (const child of this.state.children) {

            if (child.keyId !== keyId && child.ref.current!.form.name === name) {
                checkNameDuplicate = true;
                break;
            }
        }

        if (checkNameDuplicate) {

            this.setState({ error: "Find duplicated field name in this layer." })

        } else {

            this.setState({ error: undefined })

        }
    }

    render() {

        return (
            <>
                {
                    this.state.error &&
                    <Row>
                        <Col lg="auto" className="px-0 mx-0" style={{ width: (this.props.depth * 20).toString() + "px" }} />
                        <Col>
                            <span style={{ color: "red" }}>{this.state.error} </span>
                        </Col>
                    </Row>
                }
                {
                    this.state.children.map((child, index) =>
                        <Factory key={child.keyId}
                            {...child}
                            ref={child.ref}
                            changeType={this.changeType.bind(this)}
                            changeName={this.checkChildName.bind(this)}
                            depth={this.props.depth} />
                    )
                }
            </>
        );
    }
}

export default ChildrenNodes;