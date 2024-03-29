import { FieldWithoutType, IBooleanEditorField } from "../../component/schema_editor/type_SchemaEditor";
import { DataType } from "../../type";
import { CloneReturnValue } from "../utility";
import Schema from "./Schema";
import { IBooleanSchemaType, IGenericSchemaType } from "./type_schema";

class BooleanSchema extends Schema<IBooleanSchemaType, IBooleanEditorField> {
    protected type = DataType.Boolean;
    protected currentField: Required<IBooleanEditorField>;
    protected defaultField: Required<IBooleanEditorField>;

    constructor(schema?: IBooleanSchemaType, field?: FieldWithoutType<IBooleanEditorField>) {
        super();

        const genericField = this.getGenericFieldFromSchema(schema, field);

        this.defaultField = {
            ...genericField,

            default: this.retrieveDefaultOptionValue("default", undefined, schema),
            const: this.retrieveDefaultOptionValue("const", undefined, schema),
        };

        this.currentField = { ...this.defaultField };
    }

    private isSelectElement(
        event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
    ): event is React.ChangeEvent<HTMLSelectElement> {
        if ((event as React.ChangeEvent<HTMLSelectElement>).target.selectedIndex !== undefined) return true;
        else return false;
    }

    @CloneReturnValue
    public recordField(
        fieldName: keyof IBooleanEditorField,
        changeEvent: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
    ): Required<IBooleanEditorField> {
        if (this.isSelectElement(changeEvent) && (fieldName === "default" || fieldName === "const")) {
            this.currentField[fieldName] = changeEvent.target.value.toLowerCase() === "true" ? true : false;
        } else if (!this.isSelectElement(changeEvent)) {
            Schema.prototype.recordField.call(this, fieldName, changeEvent);
        }

        return this.currentField;
    }

    @CloneReturnValue
    resetOptionField(): Required<IBooleanEditorField> {
        this.currentField.default = this.defaultField.default;

        return this.currentField;
    }

    @CloneReturnValue
    clearOptionField(): Required<IBooleanEditorField> {
        this.currentField.default = undefined as unknown as boolean;

        return this.currentField;
    }

    exportSchema(): IBooleanSchemaType {
        const type = DataType.Boolean;

        const genericSchema: IGenericSchemaType = this.getGenericSchemaFromField(this.currentField);

        const defaultValue = this.exportSchemaWithoutUndefined("default", undefined as unknown as boolean);
        const constValue = this.exportSchemaWithoutUndefined("const", undefined as unknown as boolean);

        return {
            type,
            ...genericSchema,
            ...defaultValue,
            ...constValue,
        };
    }
}

export default BooleanSchema;
