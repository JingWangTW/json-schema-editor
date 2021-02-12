import { IGenericField } from "../../component/node_component/type_NodeComponent";
import { DataType, IntersectionKey } from "../../type";
import { CloneReturnValue, NextId, getOrDefault } from "../utility";
import { IGenericSchemaType, ISchemaType } from "./type_schema";

abstract class Schema<T extends IGenericField> {
    protected abstract type: DataType;
    protected abstract currentField: Required<T>;
    protected abstract defaultField: Required<T>;

    abstract resetOptionField(): Required<T>;
    abstract clearOptionField(): Required<T>;
    abstract exportSchema(): ISchemaType;

    @CloneReturnValue
    public recordField(fieldName: keyof T, changeEvent: React.ChangeEvent<HTMLInputElement>): Required<T> {
        switch (typeof this.currentField[fieldName]) {
            case "string":
                this.currentField[fieldName] = (changeEvent.target.value.toString() as unknown) as T[keyof T];
                break;
            case "boolean":
                this.currentField[fieldName] = (changeEvent.target.checked as unknown) as T[keyof T];
                break;
            case "number":
                this.currentField[fieldName] = (parseInt(changeEvent.target.value) as unknown) as T[keyof T];
                break;
        }

        return this.currentField;
    }

    @CloneReturnValue
    public getDefaultField(): Required<T> {
        return this.defaultField;
    }

    @CloneReturnValue
    public getCurrentField(): Required<T> {
        return this.currentField;
    }

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

    protected retrieveDefaultValue<T extends ISchemaType, U extends IGenericField, K extends IntersectionKey<T, U>>(
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
