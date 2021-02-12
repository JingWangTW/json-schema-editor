import { IArrayEditorField } from "../../component/schema_editor/type_SchemaEditor";
import { DataType } from "../../type";
import Schema from "./Schema";
import { IArraySchemaType, IChildrenSchemaType, IGenericSchemaType } from "./type_schema";

class ArraySchema extends Schema<IArrayEditorField> {
    protected type = DataType.Array;
    protected currentField: Required<IArrayEditorField>;
    protected defaultField: Required<IArrayEditorField>;
    public readonly childrenSchema?: IChildrenSchemaType;

    constructor(schema?: IArraySchemaType, field?: IArrayEditorField) {
        super();

        const genericField = this.getGenericFieldFromSchema(schema, field);

        this.defaultField = {
            ...genericField,

            minItems: this.retrieveDefaultValue("minItems", 0, schema, field),
            maxItems: this.retrieveDefaultValue("maxItems", 0, schema, field),
            uniqueItems: this.retrieveDefaultValue("uniqueItems", false, schema, field),
        };

        this.currentField = this.defaultField;

        if (schema) this.childrenSchema = this.generateChildrenSchemaFromSchema(schema);
    }

    generateChildrenSchemaFromSchema(schema: IArraySchemaType): IChildrenSchemaType {
        if (schema.items) {
            if (schema.items instanceof Array) {
                return schema.items.map(s => {
                    return {
                        name: "items",
                        value: s,
                        required: true,
                    };
                });
            } else {
                return [
                    {
                        name: "items",
                        value: schema.items,
                        required: true,
                    },
                ];
            }
        } else {
            return [];
        }
    }

    clearOptionField(): Required<IArrayEditorField> {
        this.currentField.maxItems = 0;
        this.currentField.minItems = 0;
        this.currentField.uniqueItems = false;

        return this.currentField;
    }

    exportSchema(children?: IChildrenSchemaType): IArraySchemaType {
        const type = DataType.Array;

        const genericSchema: IGenericSchemaType = this.getGenericSchemaFromField(this.currentField);

        const { minItems, maxItems, uniqueItems } = this.currentField;

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
}

export default ArraySchema;
