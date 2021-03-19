import React from "react";

import { FieldWithoutType, IArrayEditorField, IChildProperty, ISchemaEditorType } from "../../component/schema_editor/type_SchemaEditor";
import { DataType } from "../../type";
import { CloneReturnValue, NextId } from "../utility";
import Schema from "./Schema";
import { IArraySchemaType, IChildrenSchemaType, IGenericSchemaType } from "./type_schema";

class ArraySchema extends Schema<IArraySchemaType, IArrayEditorField> {
    protected type = DataType.Array;
    protected currentField: Required<IArrayEditorField>;
    protected defaultField: Required<IArrayEditorField>;
    public readonly childrenProperty?: IChildProperty[];

    constructor(schema?: IArraySchemaType, field?: FieldWithoutType<IArrayEditorField>) {
        super();

        const genericField = this.getGenericFieldFromSchema(schema, field);

        this.defaultField = {
            ...genericField,

            const: schema && schema.const ? JSON.stringify(schema.const, null, 4) : "[]",
            default: schema && schema.default ? JSON.stringify(schema.default, null, 4) : "[]",

            minItems: this.retrieveDefaultOptionValue("minItems", NaN, schema),
            maxItems: this.retrieveDefaultOptionValue("maxItems", NaN, schema),
            uniqueItems: this.retrieveDefaultOptionValue("uniqueItems", false, schema),
        };

        this.currentField = { ...this.defaultField };

        if (schema) this.childrenProperty = this.generateChildrenPropertyFromSchema(schema);
    }

    @CloneReturnValue
    recordCode(field: "const" | "default", value: string): Required<IArrayEditorField> {
        this.currentField[field] = value;

        return this.currentField;
    }

    generateChildrenPropertyFromSchema(schema: IArraySchemaType): IChildProperty[] {
        if (schema.items) {
            if (schema.items instanceof Array) {
                return schema.items.map(s => {
                    return {
                        type: s.type,
                        selfId: NextId.next("child").toString(),

                        hasSibling: true,
                        isDeleteable: true,
                        isRequiredFieldReadonly: true,
                        isNameFieldReadonly: true,

                        ref: React.createRef<ISchemaEditorType>(),

                        field: {
                            name: "items",
                            required: true,
                        },

                        schema: s,
                    };
                });
            } else {
                return [
                    {
                        type: schema.type,
                        selfId: NextId.next("child").toString(),

                        hasSibling: true,
                        isDeleteable: true,
                        isRequiredFieldReadonly: true,
                        isNameFieldReadonly: true,

                        ref: React.createRef<ISchemaEditorType>(),

                        field: {
                            name: "items",
                            required: true,
                        },

                        schema: schema.items,
                    },
                ];
            }
        } else {
            return [];
        }
    }

    @CloneReturnValue
    resetOptionField(): Required<IArrayEditorField> {
        this.currentField.const = this.defaultField.const;
        this.currentField.default = this.defaultField.default;

        this.currentField.maxItems = this.defaultField.maxItems;
        this.currentField.minItems = this.defaultField.minItems;
        this.currentField.uniqueItems = this.defaultField.uniqueItems;

        return this.currentField;
    }

    @CloneReturnValue
    clearOptionField(): Required<IArrayEditorField> {
        this.currentField.const = "[]";
        this.currentField.default = "[]";

        this.currentField.maxItems = NaN;
        this.currentField.minItems = NaN;
        this.currentField.uniqueItems = false;

        return this.currentField;
    }

    exportSchema(children?: IChildrenSchemaType): IArraySchemaType {
        const type = DataType.Array;

        const genericSchema: IGenericSchemaType = this.getGenericSchemaFromField(this.currentField);

        const { uniqueItems } = this.currentField;

        const minItems = this.exportSchemaWithoutUndefined("minItems", NaN);
        const maxItems = this.exportSchemaWithoutUndefined("maxItems", NaN);

        const constant = this.exportSchemaWithoutUndefined_code("const");
        const defaultValue = this.exportSchemaWithoutUndefined_code("default");

        let items: IArraySchemaType["items"];

        if (children) {
            if (children.length === 1) {
                items = children[0].value;
            } else if (children.length > 1) {
                items = children.map(child => child.value);
            }
        }

        return {
            type,
            ...genericSchema,
            ...minItems,
            ...maxItems,
            uniqueItems,
            items,
            ...constant,
            ...defaultValue,
        };
    }
}

export default ArraySchema;
