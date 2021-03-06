import { DataType, XOR_Partial } from "../../type";

export interface IGenericSchemaType {
    title?: string;
    description?: string;
    $comment?: string;
}

export interface IArraySchemaType extends IGenericSchemaType {
    type: DataType.Array;

    const?: Record<string, unknown>;
    default?: Record<string, unknown>;

    minItems?: number;
    maxItems?: number;
    uniqueItems?: boolean;
    items?: ISchemaType[] | ISchemaType;
}

export interface IBooleanSchemaType extends IGenericSchemaType {
    type: DataType.Boolean;

    default?: boolean;
    const?: boolean;
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

    const?: Record<string, unknown>;
    default?: Record<string, unknown>;

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

export interface ISchemaTypeEnummable {
    addEnum(): void;
    updateEnum(index: number, changeEvent: React.ChangeEvent<HTMLInputElement>): void;
    deleteEnum(index: number): void;
}

export type ISchemaType =
    | IArraySchemaType
    | IBooleanSchemaType
    | IIntegerSchemaType
    | INullSchemaType
    | INumberSchemaType
    | IObjectSchemaType
    | IStringSchemaType;
