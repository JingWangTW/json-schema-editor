import Hint from "../../model/Hint";
import { ISchemaType } from "../../model/schema/type_schema";
import { DataType, PartialBy } from "../../type";
import { IGenericField } from "../node_component/type_NodeComponent";
import SchemaEditor from "./SchemaEditor";

// Type to represent all schema editor
// Type cannot check class derived from generic class
export type ISchemaEditorType = SchemaEditor<ISchemaType, ISchemaEditorField>;

export type FieldWithoutType<T extends ISchemaEditorField> = Omit<T, "type">;

export interface ISchemaEditorProps<SchemaType extends ISchemaType> {
    depth: number;

    hasSibling?: boolean;
    isDeleteable?: boolean;
    isRequiredFieldReadonly?: boolean;
    isNameFieldReadonly?: boolean;

    field?: PartialBy<IGenericField, "type">;
    schema?: SchemaType;

    changeType(type: DataType): void;
    changeName(): void;
    addSibling?(): void;
    delete?(): void;
}

export interface ISchemaEditorState<FieldType extends ISchemaEditorField> {
    currentField: Required<FieldType>;

    hint: Hint;
}

export interface IArrayEditorField extends IGenericField {
    const?: string;

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

export type INullEditorField = IGenericField;

export interface INumberEditorField extends IGenericField {
    default?: number;
    const?: number;
    enum?: number[];
    minimum?: number;
    maximum?: number;
    exclusiveMinimum?: boolean;
    exclusiveMaximum?: boolean;
    multipleOf?: number;
}

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

export interface INewChildEditorProps {
    type: DataType;
    hasSibling?: boolean;
    isDeleteable?: boolean;
    isRequiredFieldReadonly?: boolean;
    isNameFieldReadonly?: boolean;

    field?: Omit<IGenericField, "type">;
}

export interface IChildProperty {
    type: DataType;
    selfId: string;

    hasSibling: boolean;
    isDeleteable: boolean;
    isRequiredFieldReadonly: boolean;
    isNameFieldReadonly: boolean;

    ref: React.RefObject<ISchemaEditorType>;

    field?: Omit<IGenericField, "type">;
    schema?: ISchemaType;
}

export interface IChildrenEditorProps {
    depth: number;
    isNameUnique: boolean;

    childrenProperty?: Array<IChildProperty>;

    childrenDidUpdate?(children: IChildProperty[]): void;
}

export type ISchemaEditorField =
    | IArrayEditorField
    | IBooleanEditorField
    | IIntegerEditorField
    | INumberEditorField
    | INullEditorField
    | IObjectEditorField
    | IStringEditorField;
