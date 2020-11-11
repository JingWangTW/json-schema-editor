import { Type } from '../../data_type/DataType';

export default interface NodeFactoryProps {
    type: keyof typeof Type;

    hasChild?: Boolean;
    isDeleteAble?: Boolean;
    isOptionExist?: Boolean;
    fieldName?: String;

    changeType(type: keyof typeof Type): void;
}