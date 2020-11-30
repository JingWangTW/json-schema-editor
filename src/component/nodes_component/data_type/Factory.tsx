import React from 'react';

import { NodeFactoryProps } from '../interface/Props';
import { NodeFactoryState } from '../interface/State';
import * as DataType from './DataType';

class Factory extends React.Component<NodeFactoryProps, NodeFactoryState> {

    private nodeRef: any

    constructor(props: NodeFactoryProps) {

        super(props);

        this.state = {
            type: props.type
        }

        this.nodeRef = React.createRef<DataType.Node>();
    }

    exportSchemaObj(): any {
        return this.nodeRef.current!.exportSchemaObj();
    }

    render(): JSX.Element {
        switch (this.props.type) {
            case DataType.Type.Array:
                return <DataType.ArrayNode {...this.props} ref={this.nodeRef} />
            case DataType.Type.Boolean:
                return <DataType.BooleanNode {...this.props} ref={this.nodeRef} />
            case DataType.Type.Integer:
                return <DataType.IntegerNode {...this.props} ref={this.nodeRef} />
            case DataType.Type.Number:
                return <DataType.NumberNode {...this.props} ref={this.nodeRef} />
            case DataType.Type.Object:
                return <DataType.ObjectNode {...this.props} ref={this.nodeRef} />
            case DataType.Type.String:
                return <DataType.StringNode {...this.props} ref={this.nodeRef} />
            default:
                return <DataType.ObjectNode {...this.props} ref={this.nodeRef} />
        }
    }
}

export default Factory;