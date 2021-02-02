import { XOR_Partial } from "../../type";

interface IGenericSchemaType {
    title?: string;
    description?: string;
    $comment?: string;
}

export interface IArraySchemaType extends IGenericSchemaType {
    minItems?: number;
    maxItems?: number;
    uniqueItems?: boolean;
    items?: ISchemaType[] | ISchemaType;
}

export interface IBooleanSchemaType extends IGenericSchemaType {
    default?: boolean;
}

export type IIntegerSchemaType = IGenericSchemaType & {
    default?: number;
    const?: number;
    enum?: Array<number>;

    multipleOf?: number;
} & XOR_Partial<{ exclusiveMinimum: number }, { minimum: number }> &
    XOR_Partial<{ exclusiveMaximum: number }, { maximum: number }>;

export type INullSchemaType = IGenericSchemaType;

export type INumberSchemaType = IGenericSchemaType & {
    default?: number;
    const?: number;
    enum?: Array<number>;

    multipleOf?: number;
} & XOR_Partial<{ exclusiveMinimum: number }, { minimum: number }> &
    XOR_Partial<{ exclusiveMaximum: number }, { maximum: number }>;

export interface IObjectSchemaType extends IGenericSchemaType {
    properties: Record<string, ISchemaType>;
    required: string[];

    maxProperties?: number;
    minProperties?: number;
}

export interface IStringSchemaType extends IGenericSchemaType {
    default?: string;
    const?: string;
    enum?: string[];
    minLength?: number;
    maxLength?: number;
    format?:
        | "date-time"
        | "time"
        | "date"
        | "email"
        | "idn-email"
        | "hostname"
        | "idn-hostname"
        | "ipv4"
        | "ipv6"
        | "uri"
        | "uri-reference"
        | "iri"
        | "iri-reference"
        | "uri-template"
        | "json-pointer"
        | "relative-json-pointer"
        | "regex";
    pattern?: string;
}

export type ISchemaType =
    | IArraySchemaType
    | IBooleanSchemaType
    | IIntegerSchemaType
    | INullSchemaType
    | INumberSchemaType
    | IObjectSchemaType
    | IStringSchemaType;
