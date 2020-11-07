import React from 'react';
import {
    ArrayNode,
    StringNode,
    BooleanNode,
    IntegerNode,
    NumberNode,
    ObjectNode
} from '../nodes_component/TypedNode';

import RootNode from '../nodes_component/RootNode';

class SchemaEditor extends React.Component {

    render() {
        return (
            <div>
                Root <RootNode></RootNode>


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