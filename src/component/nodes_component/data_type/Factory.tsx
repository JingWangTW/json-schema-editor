import React from 'react';
import * as NodeField from '../interface/NodeField';

import { NodeFactoryProps } from '../interface/Props';
import * as DataType from './DataType';

const Factory = React.forwardRef<DataType.Node<NodeField.default>, NodeFactoryProps<NodeField.default>>((props, ref) => {

    switch (props.type) {
        case DataType.Type.Array:
            return <DataType.ArrayNode  {...{ ...props, field: props.field as NodeField.ArrayField }} ref={ref as React.RefObject<DataType.ArrayNode>} />
        case DataType.Type.Boolean:
            return <DataType.BooleanNode {...{ ...props, field: props.field as NodeField.BooleanField }} ref={ref as React.RefObject<DataType.BooleanNode>} />
        case DataType.Type.Integer:
            return <DataType.IntegerNode {...{ ...props, field: props.field as NodeField.IntegerField }} ref={ref as React.RefObject<DataType.IntegerNode>} />
        case DataType.Type.Number:
            return <DataType.NumberNode {...{ ...props, field: props.field as NodeField.NumberField }} ref={ref as React.RefObject<DataType.NumberNode>} />
        case DataType.Type.Null:
            return <DataType.NullNode {...{ ...props, field: props.field as NodeField.NullField }} ref={ref as React.RefObject<DataType.NullNode>} />
        case DataType.Type.Object:
            return <DataType.ObjectNode {...{ ...props, field: props.field as NodeField.ObjectField }} ref={ref as React.RefObject<DataType.ObjectNode>} />
        case DataType.Type.String:
            return <DataType.StringNode {...{ ...props, field: props.field as NodeField.StringField }} ref={ref as React.RefObject<DataType.StringNode>} />
        default:
            return <DataType.ObjectNode {...{ ...props, field: props.field as NodeField.ObjectField }} ref={ref as React.RefObject<DataType.ObjectNode>} />
    }
});

export default Factory;