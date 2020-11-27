import { Type } from '../../data_type/DataType';

export default interface NodeFactoryProps {

    keyId: string;

    depth: number;
    type: keyof typeof Type;

    hasChild?: boolean;
    hasSibling?: boolean;

    isDeleteAble?: boolean;
    isOptionExist?: boolean;
    fieldName?: string;

    changeType(keyId: string, type: keyof typeof Type): void;
    addSibling?(): void;
}