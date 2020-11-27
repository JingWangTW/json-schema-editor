interface NodeField {

    name?: string;
    type?: string;
    title?: string;
    description?: string;

    // array 
    min_items?: number;
    max_items?: number;
    unique?: boolean;

    // string, integer, number, boolean
    default?: string | number;

    // string, integer, number
    constant?: string | number;
    enum?: Array<string> | Array<number>;

    // string
    min_length?: number;
    max_length?: number;
    format?: "date-time" | "time" | "date" | "email" | "idn-email" | "hostname" | "idn-hostname" | "ipv4" | "ipv6" | "uri" | "uri-reference" | "iri" | "iri-reference" | "uri-template" | "json-pointer" | "relative-json-pointer" | "regex";
    pattern?: string;

    // integer, number
    min_value?: number;
    min_exclusive?: boolean;
    max_value?: number;
    max_exclusive?: boolean;
}

export default NodeField;