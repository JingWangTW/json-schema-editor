import { NodeProps } from './interface/SchemaComponentProps';
import Node from './Node';

class StringNode extends Node {

    constructor(props: any) {
        super(props)

        this.option = [
            { field: "Max Length", type: "number", minValue: 0 },
            { field: "Min Length", type: "number", minValue: 0 },
            { field: "Format", type: "select", option: ["date-time", "time", "date", "email", "idn-email", "hostname", "idn-hostname", "ipv4", "ipv6", "uri", "uri-reference", "iri", "iri-reference", "uri-template", "json-pointer", "relative-json-pointer", "regex"] },
            { field: "Pattern", type: "number", placeholder: "Regular Expression" },
        ]
    }


}

export default StringNode;