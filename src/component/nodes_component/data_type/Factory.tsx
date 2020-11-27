import React from 'react';

import { NodeFactoryProps } from '../interface/Props';
import { NodeFactoryState } from '../interface/State';
import * as DataType from './DataType';

class Factory extends React.Component<NodeFactoryProps, NodeFactoryState> {

    constructor(props: NodeFactoryProps) {

        super(props);

        this.state = {
            type: props.type
        }
    }

    render(): JSX.Element {
        switch (this.props.type) {
            case DataType.Type.Array:
                return <DataType.ArrayNode {...this.props} />
            case DataType.Type.Boolean:
                return <DataType.BooleanNode {...this.props} />
            case DataType.Type.Integer:
                return <DataType.IntegerNode {...this.props} />
            case DataType.Type.Number:
                return <DataType.NumberNode {...this.props} />
            case DataType.Type.Object:
                return <DataType.ObjectNode {...this.props} />
            case DataType.Type.String:
                return <DataType.StringNode {...this.props} />
            default:
                return <DataType.ObjectNode {...this.props} />
        }
    }
}

export default Factory;