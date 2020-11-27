export default interface NodeOptionButtonsProps {
    hasChild: boolean;
    hasSibling: boolean;

    isOptionExist: boolean;
    isDeleteAble: boolean;

    clickOption(): void;

    clickAddChild(): void;
    clickAddSibling(): void;
    clickDelete(): void;
}