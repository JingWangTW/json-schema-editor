import * as DataType from '../../data_type/DataType';

interface NodeProperty {
    type: keyof typeof DataType.Type
}
export default interface ChildNodesState {
    children: Array<NodeProperty>
};