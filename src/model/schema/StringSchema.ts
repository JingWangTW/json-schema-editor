import { FieldWithoutType, IStringEditorField } from "../../component/schema_editor/type_SchemaEditor";
import { DataType } from "../../type";
import { CloneReturnValue } from "../utility";
import Schema from "./Schema";
import { IGenericSchemaType, ISchemaTypeEnummable, IStringSchemaType } from "./type_schema";

class StringSchema extends Schema<IStringSchemaType, IStringEditorField> implements ISchemaTypeEnummable {
    protected type = DataType.String;
    protected currentField: Required<IStringEditorField>;
    protected defaultField: Required<IStringEditorField>;

    constructor(schema?: IStringSchemaType, field?: FieldWithoutType<IStringEditorField>) {
        super();

        const genericField = this.getGenericFieldFromSchema(schema, field);

        this.defaultField = {
            ...genericField,

            default: this.retrieveDefaultOptionValue("default", "", schema),
            const: this.retrieveDefaultOptionValue("const", "", schema),
            enum: this.retrieveDefaultOptionValue("enum", [], schema),
            minLength: this.retrieveDefaultOptionValue("minLength", NaN, schema),
            maxLength: this.retrieveDefaultOptionValue("maxLength", NaN, schema),

            format: this.retrieveDefaultOptionValue("format", "" as IStringSchemaType["format"], schema),
            pattern: this.retrieveDefaultOptionValue("pattern", "", schema),
        };

        this.currentField = { ...this.defaultField, enum: [...this.defaultField.enum] };
    }

    addEnum(): void {
        this.currentField.enum.push("");
    }

    updateEnum(index: number, changeEvent: React.ChangeEvent<HTMLInputElement>): void {
        this.currentField.enum[index] = changeEvent.target.value;
    }

    deleteEnum(index: number): void {
        this.currentField.enum.splice(index, 1);
    }

    @CloneReturnValue
    resetOptionField(): Required<IStringEditorField> {
        this.currentField.default = this.defaultField.default;
        this.currentField.const = this.defaultField.const;
        this.currentField.enum = [...this.defaultField.enum];
        this.currentField.minLength = this.defaultField.minLength;
        this.currentField.maxLength = this.defaultField.maxLength;
        this.currentField.format = this.defaultField.format;
        this.currentField.pattern = this.defaultField.pattern;

        return this.currentField;
    }

    @CloneReturnValue
    clearOptionField(): Required<IStringEditorField> {
        this.currentField.default = "";
        this.currentField.const = "";
        this.currentField.enum = [];
        this.currentField.minLength = NaN;
        this.currentField.maxLength = NaN;
        this.currentField.format = "" as Required<IStringEditorField>["format"];
        this.currentField.pattern = "";

        return this.currentField;
    }

    exportSchema(): IStringSchemaType {
        const type = DataType.String;

        const genericSchema: IGenericSchemaType = this.getGenericSchemaFromField(this.currentField);

        const enumeration = this.currentField.enum.filter(e => e !== "");
        const enn = enumeration.length > 0 ? { enum: enumeration } : {};

        const defaultValue = this.exportSchemaWithoutUndefined("default", "");
        const constValue = this.exportSchemaWithoutUndefined("const", "");
        const minLength = this.exportSchemaWithoutUndefined("minLength", NaN);
        const maxLength = this.exportSchemaWithoutUndefined("maxLength", NaN);
        const format = this.exportSchemaWithoutUndefined("format", "" as Required<IStringEditorField>["format"]);
        const pattern = this.exportSchemaWithoutUndefined("pattern", "");

        return {
            type,
            ...genericSchema,

            ...defaultValue,
            ...constValue,
            ...minLength,
            ...maxLength,
            ...enn,

            ...format,
            ...pattern,
        };
    }
}

export default StringSchema;
