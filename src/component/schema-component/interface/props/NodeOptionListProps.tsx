
interface NodeOptionProps {
    field: string;
    type: string;

    minValue?: number;
    placeholder?: any;
    value?: any;
    option?: Array<String>;
}

export interface NodeOptionListProps extends Array<NodeOptionProps> { }