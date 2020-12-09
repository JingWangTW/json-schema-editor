interface NodeField {

    name: string;
    required: boolean;
    title?: string;
    description?: string;

    // array 
    minItems?: number;
    maxItems?: number;
    uniqueItems?: boolean;

    // string, integer, number, boolean
    default?: string | number | boolean;

    // string, integer, number
    const?: string | number;
    enum?: (string | number)[];// | number[];

    // string
    minLength?: number;
    maxLength?: number;
    format?: "date-time" | "time" | "date" | "email" | "idn-email" | "hostname" | "idn-hostname" | "ipv4" | "ipv6" | "uri" | "uri-reference" | "iri" | "iri-reference" | "uri-template" | "json-pointer" | "relative-json-pointer" | "regex";
    pattern?: string;

    // integer, number
    minimum?: number;
    maximum?: number;
    exclusiveMinimum?: number;
    exclusiveMaximum?: number;

    multipleOf?: number;

}

interface GenericField {
    name: string;
    title?: string;
    description?: string;
    required?: boolean;
}

interface ArrayField {
    minItems?: number;
    maxItems?: number;
    uniqueItems?: boolean;
}

interface BooleanField {
    default?: boolean;
}

interface IntegerField {

    default?: number;
    const?: number;
    enum?: Array<number>;
    minimum?: number;
    maximum?: number;
    exclusiveMinimum?: number;
    exclusiveMaximum?: number;
    multipleOf?: number;
}

interface NumberField {

    default?: number;
    const?: number;
    enum?: number[];
    minimum?: number;
    maximum?: number;
    exclusiveMinimum?: number;
    exclusiveMaximum?: number;
    multipleOf?: number;

}

interface NullField {

}

interface ObjectField {

}

interface StringField {

    default?: string;
    const?: string;
    enum?: string[];
    minLength?: number;
    maxLength?: number;
    format?: "date-time" | "time" | "date" | "email" | "idn-email" | "hostname" | "idn-hostname" | "ipv4" | "ipv6" | "uri" | "uri-reference" | "iri" | "iri-reference" | "uri-template" | "json-pointer" | "relative-json-pointer" | "regex";
    pattern?: string;
}

export default NodeField;

export type { GenericField };
export type { ArrayField };
export type { BooleanField };
export type { IntegerField };
export type { NumberField };
export type { NullField };
export type { ObjectField };
export type { StringField };