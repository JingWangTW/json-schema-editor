
import Array from './node_type/Array';
import Boolean from './node_type/Boolean';
import Integer from './node_type/Integer';
import Number from './node_type/Number';
import Object from './node_type/Object';
import String from './node_type/String';

import Node from './node_type/Node';

enum Type {
    Array = "Array",
    Boolean = "Boolean",
    Integer = "Integer",
    Number = "Number",
    Object = "Object",
    String = "String"
};

function Factory(type: keyof typeof Type): any {
    switch (type) {
        case Type.Array:
            return Array;
        case Type.Boolean:
            return Boolean
        case Type.Integer:
            return Integer;
        case Type.Number:
            return Number;
        case Type.Object:
            return Object;
        case Type.String:
            return String;
        default:
            return Object;
    }
}

export { Array as ArrayNode };
export { Boolean as BooleanNode };
export { Integer as IntegerNode };
export { Number as NumberNode };
export { Object as ObjectNode };
export { String as StringNode };
export { Node };


export { Type };
export { Factory };