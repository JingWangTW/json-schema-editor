import React from 'react';
import ArrayNode from '../schema-component/ArrayNode';
import StringNode from '../schema-component/StringNode';
import BooleanNode from '../schema-component/BooleanNode';
import IntegerNode from '../schema-component/IntegerNode';
import NumberNode from '../schema-component/NumberNode';
import ObjectNode from '../schema-component/ObjectNode';

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