import NodeField from "../NodeField";

export default interface NodeState<T> {
    showOptionModal: boolean;
    showDescriptionModal: boolean;
    isOptionExist: boolean;
    isDeleteAble: boolean;
    requiredReadOnly: boolean;
    hasChild: boolean;
    hasSibling: boolean;

    field: T;
    info?: string;
};