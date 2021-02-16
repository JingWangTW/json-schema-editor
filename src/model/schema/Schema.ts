import { IGenericField } from "../../component/node_component/type_NodeComponent";
import { FieldWithoutType, ISchemaEditorField } from "../../component/schema_editor/type_SchemaEditor";
import { DataType } from "../../type";
import { CloneReturnValue, NextId, getOrDefault } from "../utility";
import { IGenericSchemaType, ISchemaType } from "./type_schema";

abstract class Schema<SchemaType extends ISchemaType, FieldType extends ISchemaEditorField> {
    protected abstract type: DataType;
    protected abstract currentField: Required<FieldType>;
    protected abstract defaultField: Required<FieldType>;

    abstract resetOptionField(): Required<FieldType>;
    abstract clearOptionField(): Required<FieldType>;
    abstract exportSchema(): SchemaType;

    @CloneReturnValue
    public recordField(fieldName: keyof FieldType, changeEvent: React.ChangeEvent<HTMLInputElement>): Required<FieldType> {
        switch (typeof this.currentField[fieldName]) {
            case "string":
                this.currentField[fieldName] = (changeEvent.target.value.toString() as unknown) as FieldType[keyof FieldType];
                break;
            case "boolean":
                this.currentField[fieldName] = (changeEvent.target.checked as unknown) as FieldType[keyof FieldType];
                break;
            case "number":
                this.currentField[fieldName] = (parseInt(changeEvent.target.value) as unknown) as FieldType[keyof FieldType];
                break;
        }

        return this.currentField;
    }

    @CloneReturnValue
    public getDefaultField(): Required<FieldType> {
        return this.defaultField;
    }

    @CloneReturnValue
    public getCurrentField(): Required<FieldType> {
        return this.currentField;
    }

    protected getGenericSchemaFromField(field: IGenericField): IGenericSchemaType {
        const schema: IGenericSchemaType = {};

        if (field.title && field.title !== "") schema.title = field.title;
        if (field.description && field.description !== "") schema.description = field.description;
        if (field.$comment && field.$comment !== "") schema.$comment = field.$comment;

        return schema;
    }

    protected getGenericFieldFromSchema(schema?: IGenericSchemaType, field?: FieldWithoutType<IGenericField>): Required<IGenericField> {
        let f: IGenericField;

        if (schema === undefined) schema = {};
        if (field === undefined) {
            f = {
                type: this.type,
                required: true,
                name: `Field_${NextId.next("Field")}`,
            };
        } else {
            f = { type: this.type, ...field };
        }

        return {
            type: this.type,
            required: f.required,
            name: f.name,

            title: getOrDefault(schema.title, getOrDefault(f.title, "")),
            description: getOrDefault(schema.description, getOrDefault(f.description, "")),
            $comment: getOrDefault(schema.$comment, getOrDefault(f.$comment, "")),
        };
    }

    protected retrieveDefaultOptionValue<T extends keyof SchemaType>(
        key: T,
        defaultValue: SchemaType[T],
        schema?: SchemaType
    ): Required<SchemaType>[T] {
        if (schema && key in schema && schema[key] !== undefined) {
            return schema[key];
        } else {
            return defaultValue;
        }
    }

    protected exportSchemaWithoutUndefined<K extends keyof (SchemaType | FieldType)>(
        key: K,
        emptyValue: Required<FieldType>[K]
    ): Partial<Record<K, FieldType[K]>> {
        const temp: Partial<Record<K, FieldType[K]>> = {};

        // NaN === Nan get false
        if (typeof emptyValue === "number" && isNaN(emptyValue)) {
            if (!isNaN((this.currentField[key] as unknown) as number)) {
                temp[key] = this.currentField[key];
            }
        } else {
            if (this.currentField[key] !== emptyValue) {
                temp[key] = this.currentField[key];
            }
        }

        return temp;
    }
}

export default Schema;
