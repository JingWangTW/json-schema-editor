import { Type } from '../../data_type/DataType';
import NodeProps from './NodeProps';

export default interface NodeFactoryProps<T> extends NodeProps<T> {
    type: keyof typeof Type;
}