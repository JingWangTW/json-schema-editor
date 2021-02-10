import { IArrayEditorField } from "../../component/schema_editor/type_SchemaEditor";
import { DataType } from "../../type";
import { IArraySchemaType, IChildrenSchemaType, ISchema } from "./type_schema";

class ArraySchema implements ISchema {
    exportSchemaFromField(field: IArrayEditorField, children?: IChildrenSchemaType): IArraySchemaType {
        const type = DataType.Array;

        const { title, description, $comment } = field;

        const { minItems, maxItems, uniqueItems } = field;

        let itemsRestricted = {};

        if (minItems !== 0 || maxItems !== 0) {
            itemsRestricted = { minItems, maxItems };
        }

        let items: IArraySchemaType["items"];

        if (children) {
            if (children.length === 1) {
                items = children[0].value;
            } else {
                items = children.map(child => child.value);
            }
        }

        return {
            type,
            title,
            description,
            $comment,
            ...itemsRestricted,
            uniqueItems,
            items,
        };
    }
}

export default ArraySchema;
