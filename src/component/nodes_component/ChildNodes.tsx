import React from 'react';
import nextId from "react-id-generator";

import * as DataType from './data_type/DataType';
import { ChildNodesProps } from './interface/Props';
import { ChildNodesState } from './interface/State';
import { Type } from './data_type/DataType';

import Factory from './data_type/Factory';

class ChildNodes extends React.Component<ChildNodesProps, ChildNodesState>{

    private readonly childId: any;

    constructor(props: ChildNodesProps) {
        super(props);

        this.state = {
            children: [],
        };
    }

    add(keyId: string, isDeleteAble: boolean = true, hasSibling: boolean = true): void {

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
            keyId: nextId("childId"),
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

    render() {

        return (
            <>
                {
                    this.state.children.map((child, index) =>
                        <Factory key={child.keyId}
                            {...child}
                            changeType={this.changeType.bind(this)}
                            depth={this.props.depth} />
                    )
                }
            </>
        );
    }
}

export default ChildNodes;