import { IGenericSchemaType } from "../../model/schema/type_schema";
import { DataType } from "../../type";
import { Error, Info, Warn } from "./HintText";

export interface IGenericField {
    type: DataType;

    name: string;
    required: boolean;
    title?: string;
    description?: string;

    $comment?: string;
}

export interface IOptionsButtonsAttr {
    hasChild: boolean;
    hasSibling: boolean;
    isDeleteable: boolean;
    isOptionExist: boolean;
}

export type IGenericFieldOptions = {
    isRequiredFieldReadonly?: boolean;
    isNameFieldReadonly?: boolean;
};

export type OmitGenericField<T extends IGenericSchemaType> = Omit<T, keyof IGenericField>;

export const Hint = { Warn, Info, Error };
export type Hint = typeof Hint;
