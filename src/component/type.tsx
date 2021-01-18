// https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
export type XOR_Partial<T, U> = (Without<T, U> & Partial<U>) | (Without<U, T> & Partial<T>);

export enum DataType {
    Array = "array",
    Boolean = "boolean",
    Integer = "integer",
    Null = "null",
    Number = "number",
    Object = "object",
    String = "string",
}

export interface IGenericField {
    type: DataType;

    name: string;
    required: boolean;
    title?: string;
    description?: string;
    $comment?: string;
}

interface IArrayField extends IGenericField {
    type: DataType.Array;

    minItems?: number;
    maxItems?: number;
    uniqueItems?: boolean;
}

interface IBooleanField extends IGenericField {
    type: DataType.Boolean;

    default?: boolean;
}

interface IIntegerField extends IGenericField {
    type: DataType.Integer;

    default?: number;
    const?: number;
    enum?: Array<number>;
    minimum?: number;
    maximum?: number;
    exclusiveMinimum?: boolean;
    exclusiveMaximum?: boolean;
    multipleOf?: number;
}

interface INumberField extends IGenericField {
    type: DataType.Number;

    default?: number;
    const?: number;
    enum?: number[];
    minimum?: number;
    maximum?: number;
    exclusiveMinimum?: number;
    exclusiveMaximum?: number;
    multipleOf?: number;
}

interface INullField extends IGenericField {
    type: DataType.Null;
}

interface IObjectField extends IGenericField {
    type: DataType.Object;

    maxProperties?: number;
    minProperties?: number;
}

interface IStringField extends IGenericField {
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

export type FieldType<T extends DataType> = T extends DataType.Array
    ? IArrayField
    : T extends DataType.Boolean
    ? IBooleanField
    : T extends DataType.Integer
    ? IIntegerField
    : T extends DataType.Null
    ? INullField
    : T extends DataType.Number
    ? INumberField
    : T extends DataType.Object
    ? IObjectField
    : T extends DataType.String
    ? IStringField
    : never;

type OmitFromGenericField<T extends IGenericField> = Omit<T, "name" | "required">;
type OmitFromField<T extends IGenericField, U extends keyof T> = Omit<OmitFromGenericField<T>, U>;

export type IGenericSchema = OmitFromGenericField<IGenericField>;
export type IArraySchema = OmitFromGenericField<IArrayField> & { items?: ISchema[] | ISchema };
export type IBooleanSchema = OmitFromGenericField<IBooleanField>;
export type IIntegerSchema = OmitFromField<IIntegerField, "exclusiveMinimum" | "exclusiveMaximum" | "minimum" | "maximum"> &
    XOR_Partial<{ exclusiveMinimum: number }, { minimum: number }> &
    XOR_Partial<{ exclusiveMaximum: number }, { maximum: number }>;
export type INullSchema = OmitFromGenericField<INullField>;
export type INumberSchema = OmitFromField<INumberField, "exclusiveMinimum" | "exclusiveMaximum" | "minimum" | "maximum"> &
    XOR_Partial<{ exclusiveMinimum: number }, { minimum: number }> &
    XOR_Partial<{ exclusiveMaximum: number }, { maximum: number }>;
export type IObjectSchema = OmitFromGenericField<IObjectField> & { properties: Record<string, ISchema>; required: string[] };
export type IStringSchema = OmitFromGenericField<IStringField>;

export interface IChildSchema {
    name: string;
    value: ISchema;
    required: boolean;
}

export type IChildrenSchema = IChildSchema[];

export type ISchema = IArraySchema | IBooleanSchema | IIntegerSchema | INullSchema | INumberSchema | IObjectSchema | IStringSchema;
