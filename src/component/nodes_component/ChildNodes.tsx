import React from 'react';

import * as DataType from './data_type/DataType';
import { ChildNodesProps } from './interface/Props';
import { ChildNodesState } from './interface/State';
import Factory from './data_type/Factory';

interface NodeProperty {
    type: DataType.Type
}

class ChildNodes extends React.Component<ChildNodesProps, ChildNodesState>{

    constructor(props: ChildNodesProps) {
        super(props);

        this.state = {
            children: [],
        };
    }

    addChild(): void {
        this.setState(state => ({
            children: [...state.children, {
                type: DataType.Type.Object
            }]
        }))
    }

    changeType(): void {

    }

    render() {
        return (
            <>
                {this.state.children.map((child, index) => <Factory type={child.type} />)}
            </>
        );
    }
}

export default ChildNodes;