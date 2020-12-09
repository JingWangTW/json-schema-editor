import NodeField from "../NodeField";

export default interface NodeState {
    showOptionModal: boolean;
    showDescriptionModal: boolean;
    isOptionExist: boolean;
    isDeleteAble: boolean;
    hasChild: boolean;
    hasSibling: boolean;

    field: NodeField;
};