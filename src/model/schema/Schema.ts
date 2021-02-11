import { IGenericField } from "../../component/node_component/type_NodeComponent";
import { DataType, IntersectionKey } from "../../type";
import { NextId, getOrDefault } from "../utility";
import { IGenericSchemaType } from "./type_schema";

abstract class Schema {
    protected abstract type: DataType;
    abstract exportSchemaFromField(field: IGenericField): IGenericSchemaType;
    abstract extractFieldFromSchema(schema?: IGenericSchemaType, field?: IGenericField): IGenericField;

    protected getGenericSchemaFromField(field: IGenericField): IGenericSchemaType {
        const schema: IGenericSchemaType = {};

        if (field.title && field.title !== "") schema.title = field.title;
        if (field.description && field.description !== "") schema.description = field.description;
        if (field.$comment && field.$comment !== "") schema.$comment = field.$comment;

        return schema;
    }

    protected getGenericFieldFromSchema(schema?: IGenericSchemaType, field?: IGenericField): Required<IGenericField> {
        if (schema === undefined) schema = {};
        if (field === undefined) {
            field = {
                type: this.type,
                required: true,
                name: `Field_${NextId.next("Field")}`,
            };
        }

        return {
            type: this.type,
            required: field.required,
            name: field.name,

            title: getOrDefault(schema.title, getOrDefault(field.title, "")),
            description: getOrDefault(schema.description, getOrDefault(field.description, "")),
            $comment: getOrDefault(schema.$comment, getOrDefault(field.$comment, "")),
        };
    }

    protected retrieveDefaultValue<T extends IGenericSchemaType, U extends IGenericField, K extends IntersectionKey<T, U>>(
        key: K,
        defaultValue: T[K],
        schema?: T,
        field?: U
    ): Required<U>[K] {
        let value: T[K] | U[K] = defaultValue;

        if (field && field[key]) value = field[key];

        if (schema && schema[key]) value = schema[key];

        return value as U[K];
    }
}

export default Schema;
