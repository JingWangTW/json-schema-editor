import { Type } from '../../data_type/DataType';
import NodeProps from './NodeProps';

export default interface NodeFactoryProps extends NodeProps {
    type: keyof typeof Type;
}