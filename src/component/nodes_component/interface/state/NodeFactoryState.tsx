import { Type } from '../../data_type/DataType';

export default interface NodeFactoryState {
    type: keyof typeof Type;
}