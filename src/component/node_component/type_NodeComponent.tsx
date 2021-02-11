import { DataType } from "../../type";

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

export type OmitGenericField<T> = Omit<T, keyof IGenericField>;
export type type_Hints = Partial<Record<"error" | "info", string>>;
