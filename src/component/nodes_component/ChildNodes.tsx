import React from 'react';

import * as NodeType from './NodeType';
import { ChildNodesProps } from './interface/Props';
import { ChildNodesState } from './interface/State';

interface NodeProperty {
    type: NodeType.Type
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
                type: NodeType.Type.Object
            }]
        }))
    }

    changeType(): void {

    }

    render() {
        return (
            <>
                {this.state.children.map((child, index) => React.createElement(NodeType.Factory(child.type)))}
            </>
        );
    }
}

export default ChildNodes;