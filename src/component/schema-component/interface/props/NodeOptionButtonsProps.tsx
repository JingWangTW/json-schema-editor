import { NodeOptionListProps } from './NodeOptionListProps';

export interface NodeOptionButtonsProps {
    hasChild?: Boolean;
    optionExist: Boolean;
    clickOption(): void;
}