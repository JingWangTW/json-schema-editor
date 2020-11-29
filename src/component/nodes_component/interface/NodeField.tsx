interface NodeField {

    name: string;
    title?: string;
    description?: string;
    required?: boolean;

    // array 
    min_items?: number;
    max_items?: number;
    unique?: boolean;

    // string, integer, number, boolean
    default?: string | number | boolean;

    // string, integer, number
    constant?: string | number;
    enum?: (string | number)[];// | number[];

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

    // integer
    multiple_of?: number;
}

interface GenericField {
    name: string;
    title?: string;
    description?: string;
    required?: boolean;
}

interface ArrayField {
    min_items?: number;
    max_items?: number;
    unique?: boolean;
}

interface BooleanField {
    default?: boolean;
}

interface IntegerField {

    default?: number;
    constant?: number;
    enum?: Array<number>;
    min_value?: number;
    min_exclusive?: boolean;
    max_value?: number;
    max_exclusive?: boolean;
    multiple_of?: number;
}

interface NumberField {

    default?: number;
    constant?: number;
    enum?: number[];
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
    enum?: string[];
    min_length?: number;
    max_length?: number;
    format?: "date-time" | "time" | "date" | "email" | "idn-email" | "hostname" | "idn-hostname" | "ipv4" | "ipv6" | "uri" | "uri-reference" | "iri" | "iri-reference" | "uri-template" | "json-pointer" | "relative-json-pointer" | "regex";
    pattern?: string;
}



export default NodeField;

export type { GenericField };
export type { ArrayField };
export type { BooleanField };
export type { IntegerField };
export type { NumberField };
export type { ObjectField };
export type { StringField };