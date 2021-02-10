import { IGenericField } from "../../component/node_component/type_NodeComponent";
import { DataType, XOR_Partial } from "../../type";

interface IGenericSchemaType {
    title?: string;
    description?: string;
    $comment?: string;
}

export interface ISchema {
    exportSchemaFromField(field: IGenericField): IGenericSchemaType;
}

export interface IArraySchemaType extends IGenericSchemaType {
    type: DataType.Array;

    minItems?: number;
    maxItems?: number;
    uniqueItems?: boolean;
    items?: ISchemaType[] | ISchemaType;
}

export interface IBooleanSchemaType extends IGenericSchemaType {
    type: DataType.Boolean;

    default?: boolean;
}

export type IIntegerSchemaType = IGenericSchemaType & {
    type: DataType.Integer;

    default?: number;
    const?: number;
    enum?: Array<number>;

    multipleOf?: number;
} & XOR_Partial<{ exclusiveMinimum: number }, { minimum: number }> &
    XOR_Partial<{ exclusiveMaximum: number }, { maximum: number }>;

export interface INullSchemaType extends IGenericSchemaType {
    type: DataType.Null;
}

export type INumberSchemaType = IGenericSchemaType & {
    type: DataType.Number;

    default?: number;
    const?: number;
    enum?: Array<number>;

    multipleOf?: number;
} & XOR_Partial<{ exclusiveMinimum: number }, { minimum: number }> &
    XOR_Partial<{ exclusiveMaximum: number }, { maximum: number }>;

export interface IObjectSchemaType extends IGenericSchemaType {
    type: DataType.Object;

    properties: Record<string, ISchemaType>;
    required: string[];

    maxProperties?: number;
    minProperties?: number;
}

export interface IStringSchemaType extends IGenericSchemaType {
    type: DataType.String;

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

export interface IChildSchemaType {
    name: string;
    value: ISchemaType;
    required: boolean;
}

export type IChildrenSchemaType = IChildSchemaType[];

export type ISchemaType =
    | IArraySchemaType
    | IBooleanSchemaType
    | IIntegerSchemaType
    | INullSchemaType
    | INumberSchemaType
    | IObjectSchemaType
    | IStringSchemaType
    | IChildSchemaType
    | IChildrenSchemaType;
