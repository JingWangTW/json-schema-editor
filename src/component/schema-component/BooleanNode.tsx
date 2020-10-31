import { NodeProps } from './interface/SchemaComponentProps';
import Node from './Node';

class BooleanNode extends Node {

    constructor(props: any) {
        super(props)

        this.option = []
    }
}

export default BooleanNode;