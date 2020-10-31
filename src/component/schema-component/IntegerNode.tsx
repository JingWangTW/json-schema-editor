import { NodeProps } from './interface/SchemaComponentProps';
import Node from './Node';

class IntegerNode extends Node {

    constructor(props: any) {
        super(props)

        this.option = [
            { field: "Multiple Of", type: "number", minValue: 1 },
            { field: "Minimum", type: "number" },
            { field: "Exclusive Minimum", type: "number" },
            { field: "Maximum", type: "number" },
            { field: "Exclusive Maximum", type: "number" }
        ]
    }


}

export default IntegerNode;