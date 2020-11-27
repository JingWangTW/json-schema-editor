import * as DataType from '../../data_type/DataType';

interface NodeProperty {
    type: keyof typeof DataType.Type;
    isDeleteAble: boolean;
    hasSibling: boolean;
    keyId: string;
}
export default interface ChildNodesState {
    children: Array<NodeProperty>
};