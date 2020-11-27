import { Type } from '../../data_type/DataType';

export default interface NodeProps {
    keyId: string;
    depth: number;

    hasChild?: boolean;
    hasSibling?: boolean;

    isDeleteAble?: boolean;
    isOptionExist?: boolean;
    fieldName?: string;

    changeType(keyId: string, type: keyof typeof Type): void;
    addSibling?(): void;
}