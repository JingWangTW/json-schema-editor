import { FieldWithoutType, IIntegerEditorField } from "../../component/schema_editor/type_SchemaEditor";
import { DataType, XOR_Partial } from "../../type";
import { CloneReturnValue } from "../utility";
import Schema from "./Schema";
import { IGenericSchemaType, IIntegerSchemaType, ISchemaTypeEnummable } from "./type_schema";

class IntegerSchema extends Schema<IIntegerSchemaType, IIntegerEditorField> implements ISchemaTypeEnummable {
    protected type = DataType.Integer;
    protected currentField: Required<IIntegerEditorField>;
    protected defaultField: Required<IIntegerEditorField>;

    constructor(schema?: IIntegerSchemaType, field?: FieldWithoutType<IIntegerEditorField>) {
        super();

        const genericField = this.getGenericFieldFromSchema(schema, field);

        let min: number, max: number;
        let ex_min: boolean, ex_max: boolean;

        if (schema) {
            if (schema.minimum) {
                min = schema.minimum;
                ex_min = false;
            } else if (schema.exclusiveMinimum) {
                min = schema.exclusiveMinimum;
                ex_min = true;
            } else {
                min = NaN;
                ex_min = false;
            }

            if (schema.maximum) {
                max = schema.maximum;
                ex_max = false;
            } else if (schema.exclusiveMaximum) {
                max = schema.exclusiveMaximum;
                ex_max = true;
            } else {
                max = NaN;
                ex_max = false;
            }
        } else {
            min = max = NaN;
            ex_min = ex_max = false;
        }

        this.defaultField = {
            ...genericField,

            default: this.retrieveDefaultOptionValue("default", NaN, schema),
            const: this.retrieveDefaultOptionValue("const", NaN, schema),
            enum: this.retrieveDefaultOptionValue("enum", [], schema),
            multipleOf: this.retrieveDefaultOptionValue("multipleOf", NaN, schema),

            minimum: min,
            maximum: max,
            exclusiveMinimum: ex_min,
            exclusiveMaximum: ex_max,
        };

        this.currentField = { ...this.defaultField };
    }

    addEnum(): void {
        this.currentField.enum.push(NaN);
    }

    updateEnum(index: number, changeEvent: React.ChangeEvent<HTMLInputElement>): void {
        this.currentField.enum[index] = parseInt(changeEvent.target.value);
    }

    deleteEnum(index: number): void {
        this.currentField.enum.splice(index, 1);
    }

    @CloneReturnValue
    resetOptionField(): Required<IIntegerEditorField> {
        this.currentField.default = this.defaultField.default;
        this.currentField.const = this.defaultField.const;
        this.currentField.enum = this.defaultField.enum;
        this.currentField.minimum = this.defaultField.minimum;
        this.currentField.maximum = this.defaultField.maximum;
        this.currentField.exclusiveMinimum = this.defaultField.exclusiveMinimum;
        this.currentField.exclusiveMaximum = this.defaultField.exclusiveMaximum;
        this.currentField.multipleOf = this.defaultField.multipleOf;

        return this.currentField;
    }

    @CloneReturnValue
    clearOptionField(): Required<IIntegerEditorField> {
        this.currentField.default = NaN;
        this.currentField.const = NaN;
        this.currentField.enum = [];
        this.currentField.minimum = NaN;
        this.currentField.maximum = NaN;
        this.currentField.exclusiveMinimum = false;
        this.currentField.exclusiveMaximum = false;
        this.currentField.multipleOf = NaN;

        return this.currentField;
    }

    exportSchema(): IIntegerSchemaType {
        const type = DataType.Integer;

        const genericSchema: IGenericSchemaType = this.getGenericSchemaFromField(this.currentField);

        const enumeration = this.currentField.enum.filter(e => !isNaN(e));
        const enn = enumeration.length > 0 ? { enum: enumeration } : {};

        const defaultValue = this.exportSchemaWithoutUndefined("default", NaN);
        const constValue = this.exportSchemaWithoutUndefined("const", NaN);
        const multipleOf = this.exportSchemaWithoutUndefined("multipleOf", NaN);

        let min: XOR_Partial<{ exclusiveMinimum: number }, { minimum: number }> = {};
        let max: XOR_Partial<{ exclusiveMaximum: number }, { maximum: number }> = {};

        if (!isNaN(this.currentField.minimum)) {
            if (this.currentField.exclusiveMinimum) {
                min = { exclusiveMinimum: this.currentField.minimum };
            } else {
                min = { minimum: this.currentField.minimum };
            }
        }

        if (!isNaN(this.currentField.maximum)) {
            if (this.currentField.exclusiveMaximum) {
                max = { exclusiveMaximum: this.currentField.maximum };
            } else {
                max = { maximum: this.currentField.maximum };
            }
        }

        return {
            type,
            ...genericSchema,
            ...min,
            ...max,
            ...defaultValue,
            ...constValue,
            ...multipleOf,
            ...enn,
        };
    }
}

export default IntegerSchema;
