import { Type } from '../../data_type/DataType';

export default interface NodeProps {
    hasChild?: Boolean;
    isDeleteAble?: Boolean;
    isOptionExist?: Boolean;
    fieldName?: String;

    changeType(type: keyof typeof Type): void;
}