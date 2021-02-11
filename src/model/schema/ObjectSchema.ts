import { IObjectEditorField } from "../../component/schema_editor/type_SchemaEditor";
import { DataType } from "../../type";
import Schema from "./Schema";
import { IChildrenSchemaType, IObjectSchemaType } from "./type_schema";

class ObjectSchema extends Schema {
    protected type = DataType.Object;

    exportSchemaFromField(field: IObjectEditorField, children?: IChildrenSchemaType): IObjectSchemaType {
        const type = DataType.Object;

        const genericSchema = this.getGenericSchemaFromField(field);

        const { maxProperties, minProperties } = field;
        let propertieRestricted = {};

        if (maxProperties !== 0 || minProperties !== 0) {
            propertieRestricted = { maxProperties, minProperties };
        }

        const required: IObjectSchemaType["required"] = [];
        const properties: IObjectSchemaType["properties"] = {};

        if (children) {
            for (const child of children) {
                properties[child.name] = child.value;

                if (child.required) {
                    required.push(child.name);
                }
            }
        }

        return {
            type,
            ...genericSchema,
            ...propertieRestricted,
            required,
            properties,
        };
    }

    extractFieldFromSchema(schema?: IObjectSchemaType, field?: IObjectEditorField): Required<IObjectEditorField> {
        const genericField = this.getGenericFieldFromSchema(schema, field);

        return {
            ...genericField,
            maxProperties: this.retrieveDefaultValue("maxProperties", 0, schema, field),
            minProperties: this.retrieveDefaultValue("minProperties", 0, schema, field),
        };
    }
}

export default ObjectSchema;
