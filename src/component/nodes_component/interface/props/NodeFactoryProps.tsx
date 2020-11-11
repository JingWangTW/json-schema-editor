import { Type } from '../../data_type/DataType';

export default interface NodeFactoryProps {
    depth: number;
    type: keyof typeof Type;

    hasChild?: boolean;
    isDeleteAble?: boolean;
    isOptionExist?: boolean;
    fieldName?: string;

    changeType(type: keyof typeof Type): void;
}