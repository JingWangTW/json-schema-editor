import { IArrayEditorField } from "../../component/schema_editor/type_SchemaEditor";
import { DataType } from "../../type";
import Schema from "./Schema";
import { IArraySchemaType, IChildrenSchemaType, IGenericSchemaType } from "./type_schema";

class ArraySchema extends Schema {
    protected type = DataType.Array;

    exportSchemaFromField(field: IArrayEditorField, children?: IChildrenSchemaType): IArraySchemaType {
        const type = DataType.Array;

        const genericSchema: IGenericSchemaType = this.getGenericSchemaFromField(field);

        const { minItems, maxItems, uniqueItems } = field;

        let itemsRestricted = {};

        if (minItems !== 0 || maxItems !== 0) {
            itemsRestricted = { minItems, maxItems };
        }

        let items: IArraySchemaType["items"] = [];

        if (children) {
            if (children.length === 1) {
                items = children[0].value;
            } else {
                items = children.map(child => child.value);
            }
        }

        return {
            type,
            ...genericSchema,
            ...itemsRestricted,
            uniqueItems,
            items,
        };
    }

    extractFieldFromSchema(schema?: IArraySchemaType, field?: IArrayEditorField): Required<IArrayEditorField> {
        const genericField = this.getGenericFieldFromSchema(schema, field);

        return {
            ...genericField,

            minItems: this.retrieveDefaultValue("minItems", 0, schema, field),
            maxItems: this.retrieveDefaultValue("maxItems", 0, schema, field),
            uniqueItems: this.retrieveDefaultValue("uniqueItems", false, schema, field),
        };
    }
}

export default ArraySchema;
