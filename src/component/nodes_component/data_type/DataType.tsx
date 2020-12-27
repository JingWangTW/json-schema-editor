
import Array from './Array';
import Boolean from './Boolean';
import Integer from './Integer';
import Number from './Number';
import Null from './Null';
import Object from './Object';
import String from './String';

import Node from './Node';

enum Type {
    Array = "Array",
    Boolean = "Boolean",
    Integer = "Integer",
    Number = "Number",
    Object = "Object",
    String = "String",
    Null = "Null",
};

export { Array as ArrayNode };
export { Boolean as BooleanNode };
export { Integer as IntegerNode };
export { Number as NumberNode };
export { Null as NullNode };
export { Object as ObjectNode };
export { String as StringNode };
export { Node };

export { Type };