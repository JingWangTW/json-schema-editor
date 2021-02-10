import { IObjectEditorField } from "../../component/schema_editor/type_SchemaEditor";
import { DataType } from "../../type";
import { IChildrenSchemaType, IObjectSchemaType, ISchema } from "./type_schema";

class ObjectSchema implements ISchema {
    exportSchemaFromField(field: IObjectEditorField, children?: IChildrenSchemaType): IObjectSchemaType {
        const type = DataType.Object;

        const { title, description, $comment } = field;

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
            title,
            description,
            $comment,
            ...propertieRestricted,
            required,
            properties,
        };
    }
}

export default ObjectSchema;
