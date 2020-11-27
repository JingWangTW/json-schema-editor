interface NodeField {

    name: string;
    title?: string;
    description?: string;

    // array 
    min_items?: number;
    max_items?: number;
    unique?: boolean;

    // string, integer, number, boolean
    default?: string | number | boolean;

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

interface GenericField {
    name: string;
    title?: string;
    description?: string;
}

interface ArrayField {
    min_items?: number;
    max_items?: number;
    unique?: boolean;
}

interface BooleanField {
    default?: number;
}

interface IntegerField {

    default?: number;
    constant?: number;
    enum?: Array<number>;
    min_value?: number;
    min_exclusive?: boolean;
    max_value?: number;
    max_exclusive?: boolean;
}

interface NumberField {

    default?: number;
    constant?: number;
    enum?: Array<number>;
    min_value?: number;
    min_exclusive?: boolean;
    max_value?: number;
    max_exclusive?: boolean;

}

interface ObjectField {

}

interface StringField {

    default?: string;
    constant?: string;
    enum?: Array<string>;
    min_length?: number;
    max_length?: number;
    format?: "date-time" | "time" | "date" | "email" | "idn-email" | "hostname" | "idn-hostname" | "ipv4" | "ipv6" | "uri" | "uri-reference" | "iri" | "iri-reference" | "uri-template" | "json-pointer" | "relative-json-pointer" | "regex";
    pattern?: string;
}



export default NodeField;

export type { ArrayField };
export type { BooleanField };
export type { IntegerField };
export type { NumberField };
export type { ObjectField };
export type { StringField };