
interface GenericSchema {
    type: "array" | "boolean" | "integer" | "null" | "number" | "object" | "string";
    description?: string;
    title?: string;
}

interface ArraySchema extends GenericSchema {
    minItems?: number;
    maxItems?: number;
    uniqueItems?: boolean;

    items?: Schema[] | Schema;
}

interface BooleanSchema extends GenericSchema {
    default?: boolean;
}

interface ChildSchema {
    name: string;
    value: Schema;
    required: boolean;
}

type ChildrenSchema = ChildSchema[];

interface IntegerSchema extends GenericSchema {

    default?: number;
    const?: number;

    minimum?: number;
    maximum?: number;
    exclusiveMinimum?: number;
    exclusiveMaximum?: number;
    multipleOf?: number;

    enum?: number[];
}

interface NullSchema extends GenericSchema { }

interface NumberSchema extends GenericSchema {

    default?: number;
    const?: number;

    minimum?: number;
    maximum?: number;
    exclusiveMinimum?: number;
    exclusiveMaximum?: number;
    multipleOf?: number;

    enum?: number[];

}

interface ObjectSchema extends GenericSchema {

    properties: Record<string, Schema>;
    required: string[];
}

interface StringSchema extends GenericSchema {

    default?: string;
    const?: string;

    minLength?: number;
    maxLength?: number;
    format?: "date-time" | "time" | "date" | "email" | "idn-email" | "hostname" | "idn-hostname" | "ipv4" | "ipv6" | "uri" | "uri-reference" | "iri" | "iri-reference" | "uri-template" | "json-pointer" | "relative-json-pointer" | "regex";
    pattern?: string;

    enum?: string[];
}

type Schema = ArraySchema | BooleanSchema | IntegerSchema | NullSchema | NumberSchema | ObjectSchema | StringSchema;

export default Schema;
export type { ArraySchema };
export type { BooleanSchema };
export type { ChildrenSchema };
export type { IntegerSchema };
export type { NullSchema };
export type { NumberSchema };
export type { ObjectSchema };
export type { StringSchema };
