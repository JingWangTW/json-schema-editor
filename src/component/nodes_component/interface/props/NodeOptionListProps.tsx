interface NodeOptionProps {
    field: string;
    type: string;

    minValue?: number;
    placeholder?: any;
    value?: any;
    option?: Array<string>;
}

export default interface NodeOptionListProps extends Array<NodeOptionProps> { }