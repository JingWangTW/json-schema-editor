import { DataType, FieldType } from "../type";

export interface INodeProps<T extends DataType> {
    keyId: string;
    depth: number;

    hasChild?: boolean;
    hasSibling?: boolean;

    field?: FieldType<T>;
    isDeleteAble?: boolean;
    requiredReadOnly?: boolean;

    changeType(keyId: string, type: DataType): void;
    changeName(keyId: string, name: string): void;
    addSibling?(keyId: string): void;
    delete(keyId: string): void;
}

export default interface NodeState<T extends DataType> {
    hasChild: boolean;
    hasSibling: boolean;

    field: FieldType<T>;
    isDeleteAble: boolean;
    requiredReadOnly: boolean;

    showOptionModal: boolean;
    showDescriptionModal: boolean;

    info?: string;
    optionError?: string;
}
