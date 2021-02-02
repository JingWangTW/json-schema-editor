import { DataType } from "../../type";
import { IGenericField } from "../node_component/type_NodeComponent";

export interface ISchemaEditorProps<FieldType extends IGenericField> {
    selfId: string;
    depth: number;

    hasSibling?: boolean;
    isDeletable?: boolean;
    isRequiredFieldReadonly?: boolean;
    isNameFieldReadonly?: boolean;

    field?: FieldType;

    changeType(keyId: string, type: DataType): void;
    changeName(keyId: string, name: string): void;
    addSibling?(keyId: string): void;
    delete?(keyId: string): void;
}

export interface IArrayEditorField extends IGenericField {
    minItems?: number;
    maxItems?: number;
    uniqueItems?: boolean;
}

export interface IBooleanEditorField extends IGenericField {
    default?: boolean;
}

export interface IIntegerEditorField extends IGenericField {
    default?: number;
    const?: number;
    enum?: Array<number>;
    minimum?: number;
    maximum?: number;
    exclusiveMinimum?: boolean;
    exclusiveMaximum?: boolean;
    multipleOf?: number;
}

export interface INumberEditorField extends IGenericField {
    default?: number;
    const?: number;
    enum?: number[];
    minimum?: number;
    maximum?: number;
    exclusiveMinimum?: number;
    exclusiveMaximum?: number;
    multipleOf?: number;
}

export type IEditorNullField = IGenericField;

export interface IObjectEditorField extends IGenericField {
    maxProperties?: number;
    minProperties?: number;
}

export interface IStringEditorField extends IGenericField {
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
