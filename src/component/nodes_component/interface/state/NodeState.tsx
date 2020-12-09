import NodeField from "../NodeField";

export default interface NodeState {
    showOptionModal: boolean;
    showDescriptionModal: boolean;
    isOptionExist: boolean;
    isDeleteAble: boolean;
    requiredReadOnly: boolean;
    hasChild: boolean;
    hasSibling: boolean;

    field: NodeField;
    info?: string;
};