import * as NodeType from '../../NodeType';

interface NodeProperty {
    type: keyof typeof NodeType.Type
}
export default interface ChildNodesState {
    children: Array<NodeProperty>
};