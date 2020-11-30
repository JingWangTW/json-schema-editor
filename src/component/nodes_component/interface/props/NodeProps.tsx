import { Type } from '../../data_type/DataType';
import NodeField from '../NodeField';

export default interface NodeProps {

    keyId: string;
    depth: number;

    hasChild?: boolean;
    hasSibling?: boolean;

    field: NodeField;
    isDeleteAble?: boolean;
    isOptionExist?: boolean;

    changeType(keyId: string, type: keyof typeof Type): void;
    changeName(keyId: string, name: string): void;
    addSibling?(keyId: string): void;
    delete?(keyId: string): void;
}