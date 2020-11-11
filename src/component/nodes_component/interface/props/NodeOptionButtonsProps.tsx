export default interface NodeOptionButtonsProps {
    hasChild?: boolean;
    isOptionExist: boolean;
    isDeleteAble: boolean;

    clickOption(): void;
    clickAdd(): void;
}