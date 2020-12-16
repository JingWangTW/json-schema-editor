interface GenericField {
    name: string;
    required: boolean;
    title?: string;
    description?: string;
}

interface ArrayField extends GenericField {
    minItems?: number;
    maxItems?: number;
    uniqueItems?: boolean;
}

interface BooleanField extends GenericField {
    default?: boolean;
}

interface IntegerField extends GenericField {

    default?: number;
    const?: number;
    enum?: Array<number>;
    minimum?: number;
    maximum?: number;
    exclusiveMinimum?: number;
    exclusiveMaximum?: number;
    multipleOf?: number;
}

interface NumberField extends GenericField {

    default?: number;
    const?: number;
    enum?: number[];
    minimum?: number;
    maximum?: number;
    exclusiveMinimum?: number;
    exclusiveMaximum?: number;
    multipleOf?: number;

}

interface NullField extends GenericField {

}

interface ObjectField extends GenericField {

    maxProperties?: number;
    minProperties?: number;
}

interface StringField extends GenericField {

    default?: string;
    const?: string;
    enum?: string[];
    minLength?: number;
    maxLength?: number;
    format?: "date-time" | "time" | "date" | "email" | "idn-email" | "hostname" | "idn-hostname" | "ipv4" | "ipv6" | "uri" | "uri-reference" | "iri" | "iri-reference" | "uri-template" | "json-pointer" | "relative-json-pointer" | "regex";
    pattern?: string;
}

type NodeField = ArrayField | BooleanField | IntegerField | NumberField | NullField | ObjectField | StringField | GenericField;

export default NodeField;

export type { GenericField };
export type { ArrayField };
export type { BooleanField };
export type { IntegerField };
export type { NumberField };
export type { NullField };
export type { ObjectField };
export type { StringField };