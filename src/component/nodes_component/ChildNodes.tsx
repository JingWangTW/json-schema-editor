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

    addChild(isDeleteAble: boolean = true, hasSibling: boolean = true): void {
        this.setState(state => ({
            children: [...state.children, {
                type: DataType.Type.Object,
                isDeleteAble,
                hasSibling,
                keyId: nextId("childId"),
            }]
        }))
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

    render() {

        return (
            <>
                {
                    this.state.children.map((child, index) =>
                        <Factory key={child.keyId}
                            keyId={child.keyId}
                            type={child.type}
                            isDeleteAble={child.isDeleteAble}
                            hasSibling={child.hasSibling}
                            changeType={this.changeType.bind(this)} depth={this.props.depth} />
                    )
                }
            </>
        );
    }
}

export default ChildNodes;