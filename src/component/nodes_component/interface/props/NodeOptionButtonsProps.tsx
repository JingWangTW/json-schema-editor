export default interface NodeOptionButtonsProps {
    hasChild: boolean;
    hasSibling: boolean;

    isOptionExist: boolean;
    isDeleteAble: boolean;

    clickOption(): void;
    clickAdd(addNode: "sibling" | "child"): void;
}