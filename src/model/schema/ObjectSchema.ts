import { IObjectEditorField } from "../../component/schema_editor/type_SchemaEditor";
import { DataType } from "../../type";
import Schema from "./Schema";
import { IChildrenSchemaType, IObjectSchemaType } from "./type_schema";

class ObjectSchema extends Schema<IObjectEditorField> {
    protected type = DataType.Object;
    protected currentField: Required<IObjectEditorField>;
    protected defaultField: Required<IObjectEditorField>;
    public readonly childrenSchema?: IChildrenSchemaType;

    constructor(schema?: IObjectSchemaType, field?: IObjectEditorField) {
        super();

        const genericField = this.getGenericFieldFromSchema(schema, field);

        this.defaultField = {
            ...genericField,
            maxProperties: this.retrieveDefaultValue("maxProperties", 0, schema, field),
            minProperties: this.retrieveDefaultValue("minProperties", 0, schema, field),
        };

        this.currentField = this.defaultField;

        if (schema) this.childrenSchema = this.generateChildrenSchemaFromSchema(schema);
    }

    generateChildrenSchemaFromSchema(schema: IObjectSchemaType): IChildrenSchemaType {
        return Object.keys(schema.properties).map(s => {
            return {
                name: s,
                value: schema.properties[s],
                required: schema.required.find(r => r === s) === undefined ? false : true,
            };
        });
    }

    clearOptionField(): Required<IObjectEditorField> {
        this.currentField.maxProperties = 0;
        this.currentField.minProperties = 0;

        return this.currentField;
    }

    exportSchema(children?: IChildrenSchemaType): IObjectSchemaType {
        const type = DataType.Object;

        const genericSchema = this.getGenericSchemaFromField(this.currentField);

        const { maxProperties, minProperties } = this.currentField;
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
}

export default ObjectSchema;
