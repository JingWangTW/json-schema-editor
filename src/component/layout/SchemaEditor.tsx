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
                Array <ArrayNode />
                Boolean<BooleanNode />
                String<StringNode />

                Intefer<IntegerNode />
                Number<NumberNode />
                Object<ObjectNode />
            </div>
        );
    }
}


export default SchemaEditor;