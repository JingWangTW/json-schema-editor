import { DataType, PartialBy } from "../../type";

export interface IGenericField {
    type: DataType;

    name: string;
    required: boolean;
    title?: string;
    description?: string;

    $comment?: string;
}

export type DefaultGenericField = PartialBy<IGenericField, "name" | "required">;

export type OmitGenericField<T> = Omit<T, keyof IGenericField>;
export type type_Hints = Partial<Record<"error" | "info" | "option", string>>;
