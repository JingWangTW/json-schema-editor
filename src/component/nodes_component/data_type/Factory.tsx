import React from 'react';

import { NodeFactoryProps } from '../interface/Props';
import * as DataType from './DataType';

const Factory = React.forwardRef<DataType.Node, NodeFactoryProps>((props, ref) => {

    switch (props.type) {
        case DataType.Type.Array:
            return <DataType.ArrayNode {...props} ref={ref as React.RefObject<DataType.ArrayNode>} />
        case DataType.Type.Boolean:
            return <DataType.BooleanNode {...props} ref={ref as React.RefObject<DataType.BooleanNode>} />
        case DataType.Type.Integer:
            return <DataType.IntegerNode {...props} ref={ref as React.RefObject<DataType.IntegerNode>} />
        case DataType.Type.Number:
            return <DataType.NumberNode {...props} ref={ref as React.RefObject<DataType.NumberNode>} />
        case DataType.Type.Object:
            return <DataType.ObjectNode {...props} ref={ref as React.RefObject<DataType.ObjectNode>} />
        case DataType.Type.String:
            return <DataType.StringNode {...props} ref={ref as React.RefObject<DataType.StringNode>} />
        default:
            return <DataType.ObjectNode {...props} ref={ref as React.RefObject<DataType.ObjectNode>} />
    }
});

export default Factory;