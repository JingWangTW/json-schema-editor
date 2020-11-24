import { Type } from '../../data_type/DataType';

export default interface NodeProps {
    depth: number;

    hasChild?: boolean;
    hasSibling?: boolean;

    isDeleteAble?: boolean;
    isOptionExist?: boolean;
    fieldName?: string;

    changeType(type: keyof typeof Type): void;
    addSibling?(): void;
}