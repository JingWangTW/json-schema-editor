import React from 'react';
import {
    ArrayNode,
    StringNode,
    BooleanNode,
    IntegerNode,
    NumberNode,
    ObjectNode
} from '../nodes_component/TypedNode';

class SchemaEditor extends React.Component {

    render() {
        return (
            <div>
                <ArrayNode />
                <StringNode />
                <BooleanNode />
                <IntegerNode />
                <NumberNode />
                <ObjectNode />
            </div>
        );
    }
}


export default SchemaEditor;