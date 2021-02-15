import { INullEditorField } from "../../component/schema_editor/type_SchemaEditor";
import { DataType } from "../../type";
import { CloneReturnValue } from "../utility";
import Schema from "./Schema";
import { IGenericSchemaType, INullSchemaType } from "./type_schema";

class NullSchema extends Schema<INullSchemaType, INullEditorField> {
    protected type = DataType.Null;
    protected currentField: Required<INullEditorField>;
    protected defaultField: Required<INullEditorField>;

    constructor(schema?: INullSchemaType, field?: INullEditorField) {
        super();

        const genericField = this.getGenericFieldFromSchema(schema, field);

        this.defaultField = { ...genericField };

        this.currentField = { ...this.defaultField };
    }

    @CloneReturnValue
    resetOptionField(): Required<INullEditorField> {
        return this.currentField;
    }

    @CloneReturnValue
    clearOptionField(): Required<INullEditorField> {
        return this.currentField;
    }

    exportSchema(): INullSchemaType {
        const type = DataType.Null;

        const genericSchema: IGenericSchemaType = this.getGenericSchemaFromField(this.currentField);

        return {
            type,
            ...genericSchema,
        };
    }
}

export default NullSchema;
